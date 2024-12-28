const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const dayjs = require('dayjs'); // Import dayjs

const sns = new AWS.SNS({ region: 'us-east-2' }); // Replace 'your-region' with your AWS region
const sesTransport = require('nodemailer-ses-transport');

// Function to fetch a shift by ID
async function fetchMainShiftById(shiftId) {
  const params = {
    TableName: 'MainShift-qfmdhqquffcdzhgu6efvoqwpru-staging',
    Key: { id: shiftId },
  };
  try {
    const result = await docClient.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('Error fetching shift:', error);
    throw new Error('Could not fetch shift details');
  }
}

async function fetchStaffDetailsById(staffId) {
  const params = {
    TableName: 'TheStaff-qfmdhqquffcdzhgu6efvoqwpru-staging', // Replace with your actual staff table name
    Key: { id: staffId },
  };

  try {
    const result = await docClient.get(params).promise();
    return result.Item; // Returns the staff details including phoneNumber
  } catch (error) {
    console.error('Error fetching staff details:', error);
    throw new Error('Could not fetch staff details');
  }
}

// Function to send SMS with formatted details
async function sendTextMessage(phoneNumber, shiftDetails) {
  const { Location, startDate,locationID } = shiftDetails;
  // Format date and time
  const formattedDate = dayjs(startDate).format('YYYY-MM-DD'); // Extract date part
  const formattedTime = dayjs(startDate).format('hh:mm A'); // Extract time part in 12-hour format with AM/PM
 
  let fullLocation = Location; // Fallback to Location if LocationId is not valid
  if (locationID) {
    try {
      // Fetch location details from the location table
      const params = {
        TableName: 'Location-qfmdhqquffcdzhgu6efvoqwpru-staging', // Replace with your actual table name
        Key: { id: locationID }, // Use LocationId as the key to fetch location details
      };
      const result = await docClient.get(params).promise();
      // Extract location name if available
      if (result.Item && result.Item.name) {
        fullLocation = result.Item.name;
      } else {
        console.warn(`Location not found for LocationId: ${LocationId}`);
      }
    } catch (error) {
      console.error(`Error fetching location for LocationId: ${LocationId}`, error);
    }
  }
  // Get full address for location

  const message = `Hello, You have been assigned a new shift by Royal Employment. Location: ${fullLocation}, Date: ${formattedDate}, Time: ${formattedTime}.`;

  const params = {
    Message: message, // The message to send
    PhoneNumber: phoneNumber, // Must include country code, e.g., +1234567890
  };

  console.log('Sending SMS with parameters:', params);

  try {
    const result = await sns.publish(params).promise();
    console.log('SMS sent successfully:', result);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Could not send SMS');
  }
}

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber.startsWith('+1')) {
    return `+1${phoneNumber}`;
  }
  return phoneNumber;
};
// Function to create a new shift
async function createShift(shiftDetails, staffId, mainShiftID) {
  // Destructure `staffIds` out of shiftDetails so it is excluded
  const { staffIds, ...remainingShiftDetails } = shiftDetails;

  const newShift = {
    ...remainingShiftDetails, // Include all properties except staffIds
    id: AWS.util.uuid.v4(), // Generate a new unique ID for TheShifts table
    staffId, // Assign the new staff ID
    mainShiftID, // Set the foreign key to MainShift
  };

  const params = {
    TableName: 'TheShifts-qfmdhqquffcdzhgu6efvoqwpru-staging',
    Item: newShift,
  };

  try {
    await docClient.put(params).promise();
    console.log('Shift created successfully for staffId:', staffId);
  } catch (error) {
    console.error('Error creating shift:', error);
    throw new Error('Could not create shift for staff');
  }
}


// Function to update an existing shift
async function updateMainShift(shiftId, staffIds) {
  console.log("staffIds to update:", staffIds);

  const params = {
    TableName: 'MainShift-qfmdhqquffcdzhgu6efvoqwpru-staging',
    Key: { id: shiftId },
    UpdateExpression: 'SET staffIds = :staffIds',
    ExpressionAttributeValues: {
      ':staffIds': staffIds, // Ensure this is an array
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await docClient.update(params).promise();
    console.log('Shift updated successfully with staffIds:', result.Attributes.staffIds);
    return result.Attributes.staffIds; // Return the updated staffIds
  } catch (error) {
    console.error('Error updating shift:', error);
    throw new Error('Could not update shift');
  }
}


// Main function to replicate or update shifts
async function replicateShiftForStaff(shiftId, selectedStaffIds) {
  try {
    console.log('Shift ID:', shiftId);
    console.log('Selected Staff IDs:', selectedStaffIds);

    // Step 1: Update the MainShift with the staffIds array
    await updateMainShift(shiftId, selectedStaffIds);

    // Step 2: Fetch the updated MainShift details
    const shiftDetails = await fetchMainShiftById(shiftId);

    if (!shiftDetails) {
      throw new Error('Shift details not found');
    }

    // Step 3: Create individual shifts for each staffId in the selectedStaffIds array
    for (let i = 0; i < selectedStaffIds.length; i++) {
      const staffId = selectedStaffIds[i];
      console.log(`Creating shift for staffId: ${staffId}`);
      await createShift(shiftDetails, staffId,shiftId );
    }

    console.log('Shifts processed successfully');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Shifts processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing shifts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

async function updateStaffShiftStatus(staffId) {
  const params = {
    TableName: 'TheStaff-qfmdhqquffcdzhgu6efvoqwpru-staging', // Replace with the actual staff table name
    Key: { id: staffId }, // Use the staffId as the key
    UpdateExpression: 'SET shiftstatus = :shiftstatus, staffStatus = :staffStatus',
    ExpressionAttributeValues: {
      ':shiftstatus': 'assigned', // Update the shiftstatus to "assigned"
      ':staffStatus': 'assigned', // Update the staffStatus to "assigned"
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await docClient.update(params).promise();
    console.log(`Staff ${staffId} shiftstatus and staffStatus updated to "assigned"`, result.Attributes);
    return result.Attributes; // Return the updated attributes if needed
  } catch (error) {
    console.error(`Error updating shiftstatus and staffStatus for staff ID: ${staffId}`, error);
    throw new Error('Could not update shiftstatus and staffStatus');
  }
}

// Lambda handler function
exports.handler = async (event) => {
  console.log('Raw event:', JSON.stringify(event, null, 2));
  let parsedEvent;
  try {
    parsedEvent =
      typeof event.body === 'string' ? JSON.parse(event.body) : event;
  } catch (error) {
    console.error('Error parsing event body:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid event body' }),
    };
  }
  const { id, selectedStaffIds } = parsedEvent;
  console.log('', selectedStaffIds);
  const shiftDetails = await fetchMainShiftById(id);
  console.log('test drive-------------', shiftDetails);
  for (const staffId of selectedStaffIds) {
    const staffDetailsd = await fetchStaffDetailsById(staffId);
    console.log('shiftDetails', staffDetailsd);
    if (staffDetailsd && staffDetailsd.phoneNumber) {
      console.log('shiftDetails------', shiftDetails);
      await updateStaffShiftStatus(staffId);
      const formattedPhoneNumber = formatPhoneNumber(staffDetailsd.phoneNumber);
      console.log('formattedPhoneNumber', formattedPhoneNumber);

      await sendTextMessage(formattedPhoneNumber, shiftDetails);
      console.log(`Message sent to phone number: ${staffDetailsd.phoneNumber}`);
    } else {
      console.warn(`Phone number not found for staff ID: ${staffId}`);
    }
  }
  //const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  //console.log('formattedPhoneNumber', formattedPhoneNumber);
  // await sendTextMessage(formattedPhoneNumber);

  if (
    !id ||
    !selectedStaffIds ||
    !Array.isArray(selectedStaffIds) ||
    selectedStaffIds.length === 0
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Shift ID or selectedStaffIds missing or invalid',
      }),
    };
  }

  return await replicateShiftForStaff(id, selectedStaffIds);
};
