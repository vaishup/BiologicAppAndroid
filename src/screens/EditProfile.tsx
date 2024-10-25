import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  VStack,
  HStack,
  ScrollView,
  View,
  Modal,
} from '@gluestack-ui/themed';
import CustomTextField from '../components/TextField';
import CustomButton from '../components/Button';
import Icon from '../components/IconPack';
import {colors} from '../styles/colors'; // Make sure this points to the correct path
import {fonts_styles} from '../styles/font';
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import {useAuth} from '../navigation';
import UploadBox from '../components/Modal/UploadBox';
import DatePicker from 'react-native-date-picker';
import {generateClient} from 'aws-amplify/api';
import * as mutation from '../graphql/mutations.js';
import {getTableID} from '../hooks/authServices.tsx';
import dayjs from 'dayjs';
import {
  uploadToS3,
  downloadFromS3,
  handleProgressUpdate,
} from '../utils/utilityFunctions';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;

const EditProfile = ({route}) => {
  const {setIsUserAuth} = useAuth();
  //   async function handleSignOut() {
  //     try {
  //       await signOut();
  //       setIsUserAuth(false);
  //     } catch (error) {
  //       console.log('Error signing out: ', error);
  //     }
  //   }
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {name, dob, email, phone} = route.params || {}; // Use optional chaining in case route.params is undefined
  const [userName, setUserName] = useState('');
  const [userDob, setUserDob] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [datePicker, setDatePicker] = useState({
    isOpen: false,
    date: new Date(),
    onConfirm: (newDate: Date) => {
      const formattedDate = dayjs(newDate).format('MM-D-YYYY'); // Format the date to a string (e.g., MM/DD/YYYY)
      setUserDob(formattedDate); // Update the dob state with the selected date
      setDatePicker(prev => ({...prev, isOpen: false})); // Close the date picker
    },
  });
  const handleDateConfirm = newDate => {
    const formattedDate = dayjs(newDate).format('MM-D-YYYY'); // Format the date to a string (e.g., MM/DD/YYYY)
    setUserDob(formattedDate); // Update the dob state with the selected date
    setDatePicker(prev => ({...prev, isOpen: false})); // Close the date picker
  };
  // Set the values when the component is mounted
  useEffect(() => {
    setUserName(name);
    setUserDob(dob);
    setUserEmail(email);
    setUserPhone(phone);
  }, [name, dob, email, phone]);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [prevFileUri, setPrevFileUri] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [fileUri_front, setFileUri_front] = useState<{
    s3Path: string | null;
    prev: string | null;
    curr: string | null;
  }>({s3Path: null, prev: null, curr: null});

  const updateTheStaff = /* GraphQL */ `
    mutation UpdateTheStaff(
      $input: UpdateTheStaffInput!
      $condition: ModelTheStaffConditionInput
    ) {
      updateTheStaff(input: $input, condition: $condition) {
        id
        name
        phoneNumber
        email
        DOB
        photourl
        isBiomatritcs
        profileStatus
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const client = generateClient();

  async function handleProfile() {
    if (isLoading) return;

    console.log(name, email, phone, dob);

    try {
      setIsLoading(true);
      setErrMsg('');
      const userId = await getTableID();
      console.log('userDetail', userId);

      // Build the input object for the mutation
      const staffInput = {
        id: userId, // Assuming you have the staff's ID (userId)
        name: userName,
        phoneNumber: userPhone,
        email: userEmail,
        DOB: userDob, // Format the DOB as needed
        photourl: 'photoUrl' || '', // Optional if there's a profile photo
        isBiomatritcs: 'biometricsEnabled', // Replace with appropriate variable
        profileStatus: 'Pending', // Replace with actual status logic
      };

      // Call the GraphQL mutation to update the staff

      const updateRecord = await client.graphql({
        query: mutation.updateTheStaff,
        variables: {
          input: staffInput,
        },
      });
      console.log('Staff updated successfully:', updateRecord);

      // Handle navigation or success behavior
      navigation.navigate('Home'); // Example
    } catch (err: any) {
      // Extract the error message
      const message = (err as any).toString().split(':').pop().trim();
      console.log('Error message:', message);
      // Update the error message displayed to the user
      setErrMsg('Sorry! Please try again later');
    }

    setIsLoading(false);
  }
  useEffect(() => {
    const downloadFile = async () => {
      await downloadFromS3({
        folder: 'carInsurance',
        setFileUrl: url => {
          setFileUri(url);
          setPrevFileUri(url);
        },
      });
      setIsLoading(false);
    };
    downloadFile();
  }, []);

  const [open, setOpen] = useState(false); // Control the modal for date picker
  // const [date, setDate] = useState(new Date()); // Current date selected

  const handleConfirm = selectedDate => {
    setOpen(false); // Close date picker modal
    if (selectedDate) {
      setDate(selectedDate);
      setUserDob(selectedDate.toLocaleDateString()); // Convert date to string
    }
  };
  const [showPicker, setShowPicker] = useState(false); // State to control DatePicker visibility

  // Function to open Date Picker
  const openDatePicker = () => {
    setShowPicker(true);
  };

  // Function to format the selected date as "YYYY-MM-DD"
  const [date, setDate] = useState(new Date()); // Current selected date
  const [showModal, setShowModal] = useState(false); // Control visibility of Modal for Android

  // Function to format the selected date as "YYYY-MM-DD"
  const formatDate = selectedDate => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day = selectedDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // Keep picker open for iOS
    setShowModal(false); // Close modal for Android
    setDate(currentDate);
    setUserDob(formatDate(currentDate)); // Format and display the selected date
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <ScrollView
        bounces={false}
        style={{alignSelf: 'center', width: width}}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          minHeight: height * 0.9,
        }}>
                      <Header title="Edit Profile" isBack={false} />

        <VStack space="2xl">
          <VStack space="sm" alignItems="center">
       
            
          </VStack>

          <VStack space="xl" marginTop={30}>
            <CustomTextField
              placeholder="Name"
              value={userName}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              autoCapitalize="words"

              onChangeText={text => setUserName(text)}
            />
            <CustomTextField
              placeholder="Email"
              value={userEmail}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              onChangeText={text => setUserEmail(text.trim().toLowerCase())}
            />
            <CustomTextField
              placeholder="PhoneNo"
              value={userPhone}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              onChangeText={text => setUserPhone(text.trim().toLowerCase())}
            />

<View>
              {/* CustomTextField with TouchableOpacity to trigger the DatePicker */}
              <TouchableOpacity
                onPress={() =>
                  setDatePicker({
                    isOpen: true,
                    date: datePicker.date || new Date(),
                    onConfirm: handleDateConfirm, // Use the handleDateConfirm function
                  })
                }>
                <CustomTextField
                  onPress={() =>
                    setDatePicker({
                      isOpen: true,
                      date: datePicker.date || new Date(),
                      onConfirm: handleDateConfirm, // Use the handleDateConfirm function
                    })
                  }
                  placeholder="DOB"
                  value={userDob} // Display the selected date
                  editable={false} // Disable manual input
                  backgroundColor={colors.gray}
                  borderColor={colors.txtColor_bg}
                />
              </TouchableOpacity>

              <DatePicker
  modal
  maximumDate={new Date()} // Correct: User can't select future dates
  open={datePicker.isOpen}
  date={datePicker.date}
  onConfirm={newDate => handleDateConfirm(newDate)} // Confirm the selected date
  onCancel={() => setDatePicker(prev => ({ ...prev, isOpen: false }))} // Close the picker
  mode="date"
  timeZoneOffsetInMinutes={0}
/>
            </View>
          </VStack>
        </VStack>

        <VStack space="md">
          {errMsg && (
            <Text
              textAlign="center"
              color={colors.txtColor_danger}
              style={fonts_styles.medium}>
              {errMsg}
            </Text>
          )}
        </VStack>
      </ScrollView>
      <VStack marginTop={13} padding={20}>
        <CustomButton
          text="NEXT"
          action={handleProfile}
          loading={isLoading}
          backgroundColor={colors.btnBgColor_secondary}
          textColor={colors.white}
          disable={!(email && phone)}
        />
      </VStack>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dobButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dobText: {
    fontSize: 16,
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default EditProfile;
