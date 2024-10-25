const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to fetch a shift by ID
async function fetchShiftById(shiftId) {
  const params = {
    TableName: "TheShifts-qfmdhqquffcdzhgu6efvoqwpru-staging",
    Key: { id: shiftId },
  };

  try {
    const result = await docClient.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error("Error fetching shift:", error);
    throw new Error("Could not fetch shift details");
  }
}

// Function to create a new shift
async function createShift(shiftDetails, staffId) {
  const newShift = {
    ...shiftDetails,
    id: AWS.util.uuid.v4(), // Generate a new unique ID
    staffId, // Assign the new staff ID
  };

  const params = {
    TableName: "TheShifts-qfmdhqquffcdzhgu6efvoqwpru-staging",
    Item: newShift,
  };

  try {
    await docClient.put(params).promise();
    console.log("Shift created successfully for staffId:", staffId);
  } catch (error) {
    console.error("Error creating shift:", error);
    throw new Error("Could not create shift for staff");
  }
}

// Function to update an existing shift
async function updateShift(shiftId, staffId) {
  const params = {
    TableName: "TheShifts-qfmdhqquffcdzhgu6efvoqwpru-staging",
    Key: { id: shiftId },
    UpdateExpression: "SET staffId = :staffId",
    ExpressionAttributeValues: {
      ":staffId": staffId,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    await docClient.update(params).promise();
    console.log("Shift updated successfully with staffId:", staffId);
  } catch (error) {
    console.error("Error updating shift:", error);
    throw new Error("Could not update shift");
  }
}

// Main function to replicate or update shifts
async function replicateShiftForStaff(shiftId, selectedStaffIds) {
  try {
    console.log("Shift ID:", shiftId);
    console.log("Selected Staff IDs:", selectedStaffIds);

    // Fetch the shift details
    const shiftDetails = await fetchShiftById(shiftId);

    if (selectedStaffIds.length === 1) {
      // Update the shift with the only staff ID
      await updateShift(shiftId, selectedStaffIds[0]);
    } else {
      // Update the original shift with the first staff ID
      await updateShift(shiftId, selectedStaffIds[0]);

      // Create new shifts for the remaining staff IDs
      for (let i = 1; i < selectedStaffIds.length; i++) {
        await createShift(shiftDetails, selectedStaffIds[i]);
      }
    }

    console.log("Shifts processed successfully");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Shifts processed successfully" }),
    };
  } catch (error) {
    console.error("Error processing shifts:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

// Lambda handler function
exports.handler = async (event) => {
  console.log("Raw event:", JSON.stringify(event, null, 2));

  let parsedEvent;
  try {
    parsedEvent = typeof event.body === "string" ? JSON.parse(event.body) : event;
  } catch (error) {
    console.error("Error parsing event body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid event body" }),
    };
  }

  const { id, selectedStaffIds } = parsedEvent;

  if (!id || !selectedStaffIds || !Array.isArray(selectedStaffIds) || selectedStaffIds.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Shift ID or selectedStaffIds missing or invalid" }),
    };
  }

  return await replicateShiftForStaff(id, selectedStaffIds);
};
