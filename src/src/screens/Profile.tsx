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
import DatePicker from 'react-native-date-picker';

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;

const Profile = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhoneNo] = useState('');
  const [dob, setDob] = useState('');
  const [prevFileUri, setPrevFileUri] = useState<string | null>(null);
  const [fileUri_front, setFileUri_front] = useState<{
    s3Path: string | null;
    prev: string | null;
    curr: string | null;
  }>({s3Path: null, prev: null, curr: null});
  const [fileUri, setFileUri] = useState<string | null>(null);
  const client = generateClient();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    selfie: '',
  });

  async function handleProfile() {
    if (isLoading) return;

    console.log(name, email, phone, dob);
    if (validateForm()) {
      try {
        setIsLoading(true);
        setErrMsg('');
        const userId = await getTableID();
        console.log('userDetail', userId);
        var newFileS3Path_front = null;
        console.log('newFileS3Path_front', newFileS3Path_front);

        console.log('fileUri_front.curr', fileUri_front.curr);
        console.log('fileUri_front.curr', fileUri);

        if (fileUri_front.curr && fileUri_front.curr !== fileUri_front.prev) {
          newFileS3Path_front =
            (await uploadToS3(fileUri_front.curr, 'userprofile', 'selfie')) ||
            '';
        }
        console.log('fileUri_front.prev', fileUri_front.prev);
        // Build the input object for the mutation
        const staffInput = {
          id: userId, // Assuming you have the staff's ID (userId)
          name: name.trim(),
          phoneNumber: phone.trim(),
          email: email.trim().toLowerCase(),
          DOB: dob, // Format the DOB as needed
          photourl: fileUri_front.s3Path, // Optional if there's a profile photo
          isBiomatritcs: 'biometricsEnabled', // Replace with appropriate variable
          profileStatus: 'Pending', // Replace with actual status logic
        };

        //Call the GraphQL mutation to update the staff

        const updateRecord = await client.graphql({
          query: mutation.updateTheStaff,
          variables: {
            input: staffInput,
          },
        });
        //console.log('Staff updated successfully:', updateRecord);

        // Handle navigation or success behavior
        navigation.navigate('BioMatrics'); // Example
      } catch (err: any) {
        console.log('Error updating staff...', err);

        // Extract the error message
        const message = (err as any).toString().split(':').pop().trim();
        console.log('Error message:', message);

        // Update the error message displayed to the user
        setErrMsg('Sorry! Please try again later');
      }
    } else {
    }
    setIsLoading(false);
  }
  useEffect(() => {
    const downloadFile = async () => {
      await downloadFromS3({
        folder: 'userprofile',
        subFolder: 'selfie',
        setFileUrl: url => {
          setFileUri(url);
          setPrevFileUri(url);
          console.log('url', url);
        },
      });
      setIsLoading(false);
    };
    downloadFile();
  }, []);

  const [datePicker, setDatePicker] = useState({
    isOpen: false,
    date: new Date(),
    onConfirm: (newDate: Date) => {
      const formattedDate = dayjs(newDate).format('MM-D-YYYY'); // Format the date to a string (e.g., MM/DD/YYYY)
      setDob(formattedDate); // Update the dob state with the selected date
      setDatePicker(prev => ({...prev, isOpen: false})); // Close the date picker
    },
  });
  const handleDateConfirm = newDate => {
    const formattedDate = dayjs(newDate).format('MM-D-YYYY'); // Format the date to a string (e.g., MM/DD/YYYY)
    setDob(formattedDate); // Update the dob state with the selected date
    setDatePicker(prev => ({...prev, isOpen: false})); // Close the date picker
  };
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Valid email is required.';
    if (!phone.trim() || phone.length < 10)
      newErrors.phone = 'Valid phone number is required.';
    if (!dob) newErrors.dob = 'Date of Birth is required.';
    if (!fileUri_front.curr) newErrors.selfie = 'Selfie is required.';

    setErrors(newErrors); // Update errors state

    // If no errors, proceed with form submission
    return Object.keys(newErrors).length === 0;
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
        <VStack space="2xl">
          <VStack space="sm" alignItems="center">
            <Text
              style={fonts_styles.bold}
              color={colors.txtColor_bg}
              size="3xl">
              Profile
            </Text>
          </VStack>

          <VStack space="xl" marginTop={30}>
            <CustomTextField
              placeholder="Name"
              value={name}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              onChangeText={text => {
                setName(text);
                setErrors(prev => ({...prev, name: ''})); // Clear error on input
              }}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <CustomTextField
              placeholder="Email"
              value={email}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              onChangeText={text => {
                setEmail(text.trim().toLowerCase());
                setErrors(prev => ({...prev, email: ''})); // Clear error on input
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <CustomTextField
              placeholder="PhoneNo"
              value={phone}
              backgroundColor={colors.gray}
              borderColor={colors.txtColor_bg}
              onChangeText={text => {
                setPhoneNo(text);
                setErrors(prev => ({...prev, phone: ''})); // Clear error on input
              }}
            />
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}

            <View>
              {/* CustomTextField with TouchableOpacity to trigger the DatePicker */}
              <TouchableOpacity
                style={{marginBottom: 10}}
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
                  value={dob} // Display the selected date
                  editable={false} // Disable manual input
                  backgroundColor={colors.gray}
                  borderColor={colors.txtColor_bg}
                />
              </TouchableOpacity>
              {errors.dob ? (
                <Text style={styles.errorText}>{errors.dob}</Text>
              ) : null}

              <DatePicker
                modal
                maximumDate={new Date()} // Correct: User can't select future dates
                open={datePicker.isOpen}
                date={datePicker.date}
                onConfirm={newDate => handleDateConfirm(newDate)} // Confirm the selected date
                onCancel={() =>
                  setDatePicker(prev => ({...prev, isOpen: false}))
                } // Close the picker
                mode="date"
                timeZoneOffsetInMinutes={0}
              />
            </View>

            <VStack space="xl">
              <Text color={colors.txtColor_bg} size="2xl" fontWeight="$medium">
                Please submit your Selfie
              </Text>

              <VStack space="md">
                <UploadBox
                  placeholder="Selfie"
                  onReturnUri={uri => {
                    setFileUri_front(prev => ({...prev, curr: uri}));
                  }}
                  uri={fileUri_front.curr || ''}
                  isLoading={isLoading}
                />
                {errors.selfie ? (
                  <Text style={styles.errorText}>{errors.selfie}</Text>
                ) : null}
              </VStack>
            </VStack>
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
          <VStack marginTop={13}>
            <CustomButton
              text="NEXT"
              action={handleProfile}
              loading={isLoading}
              backgroundColor={colors.btnBgColor_secondary}
              textColor={colors.white}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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

  errorText: {
    color: 'red',
    fontSize: 14,
  },
});
export default Profile;
