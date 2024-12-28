import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  VStack,
  HStack,
  ScrollView,
  Center,
  Heading,
} from '@gluestack-ui/themed';
import CustomTextField from '../components/TextField';
import CustomButton from '../components/Button';
import Geolocation from 'react-native-geolocation-service';

import Icon from '../components/IconPack';
import {colors} from '../styles/colors';
import {fonts_styles} from '../styles/font';
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import {useAuth} from '../navigation';
import {View, StyleSheet, Dimensions} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import {getTableID} from '../hooks/authServices.tsx';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import * as mutation from '../graphql/mutations.js';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {openSettings} from 'react-native-permissions';
import {listTheShifts, getTheStaff} from '../graphql/queries';
const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/native';

const ShiftTimer = ({navigation, route}: any) => {
  const ref = React.useRef(null);
  const API = generateClient();
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
 const [latitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const isFocused = useIsFocused(); // Track if the screen is focused
  useEffect(() => {
    requestLocationPermission();
    requestBackgroundLocationPermission();
    requestLocationPermissionIOS();
    getUser();
  }, []);

  const requestBackgroundLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'This app needs background location access to track your location when you are not using the app.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Background location permission granted');
      } else {
        console.log('Background location permission denied');
      }
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        console.log('Permission status:', granted); // Log the result
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getLocation(); // Call the location function here
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestLocationPermissionIOS = async () => {
    if (Platform.OS === 'ios') {
      // Request permission for iOS
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        console.log('iOS Location permission granted');
        getGeoLocation(); // Call the function to get location
      } else {
        console.log('iOS Location permission denied');
      }
    } else if (Platform.OS === 'android') {
      try {
        // Request permission for Android
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'App Geolocation Permission',
            message: "App needs access to your phone's location.",
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android Location permission granted');
          getGeoLocation(); // Call the function to get location
        } else {
          console.log('Android Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log('Current location ios: ', latitude, longitude);
        reverseGeocode(latitude, longitude);
        setLattitude(latitude)
        setLongitude(longitude)
      },
      error => {
        // Handle error
        console.error('Error getting location:', error);
        // Alert.alert('Error getting location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const getLocation = () => {
    // if (!permissionGranted) {
    //   console.log('Location permission not granted');
    //   return;
    // }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log('Current location:', latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.log('Error getting location:', error.message, error); // Log the full error object
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = 'AIzaSyANjd568jfPoqsh1IJVm6FHWOu7kmOHCEo'; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        console.log('Formatted address:', formattedAddress);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.log('Error with reverse geocoding:', error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const {id, startTime, endTime} = route.params;
  console.log(id);
  const getUser = async () => {
    const userId = await getTableID();
    console.log(userId);

    try {
      console.log('Fetching staff with ID:', userId); // Debug log
      const staffData = await API.graphql({
        query: getTheStaff, // Replace with your actual query to get staff by ID
        variables: {id: userId},
      });
      console.log(staffData);

      const staff = staffData.data.getTheStaff;
      setName(staff.name);

      console.log('staff...s', staff.id);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };


  // Get startTime and endTime from params
  const handleSubmit = async () => {
    const userId = await getTableID();
    try {
      // Step 2: Create the input object for staff creation or update
      const shiftsInput = {
        id: id,
        shiftstatus: 'Completed',
        checkOutTime:dayjs().format("YYYY-MM-DD hh:mm A")
        // Add other fields as needed
      };
      console.log('Staff Input:', shiftsInput);
      let staffResponse;
      // Update existing staff member
      staffResponse = await API.graphql({
        query: mutation.updateTheShifts,
        variables: {
          input: shiftsInput,

        },
      });
      const staffInput = {
        id: userId,
        Location: address,
        IsActive: 'Ofline',
        latitude:latitude,
        longitude:longitude
        //shiftStatus:unassigned
        // Add other fields as needed
      };
      console.log('Staff Input:', staffInput);
      let staffResponses;
      // Update existing staff member
      staffResponses = await API.graphql({
        query: mutation.updateTheStaff,
        variables: {
          input: staffInput,
        },
      });
      // Debug the API response
      const createdItema = staffResponses.data.updateTheStaff;
      // Step 3: Handle the response and navigation
      const createdItem = staffResponse.data.updateTheShifts;
      if (!createdItem || !createdItem) {
        throw new Error('No ID returned from the GraphQL response.');
      }
      setShowModal(true);

      console.log(createdItem, 'successfully created/updated');
    } catch (error) {
      console.error('Error creating or updating staff:', error);
    }
  };
  const [showModal, setShowModal] = React.useState(false);
  function calculateTimeLeft() {
    const currentTime = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(currentTime, 'second'); // Calculate time difference in seconds
    return diff > 0 ? diff : 0;
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  console.log('timeLeft', timeLeft);

  useEffect(() => {
    if (isFocused && timeLeft > 1) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // Decrease time every second
      }, 1000);
      return () => clearInterval(timerId); // Cleanup interval on unmount
    }
  }, [timeLeft]);

  // Format time left as hours and minutes
  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);


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
        <Text style={fonts_styles.bold} color={colors.txtColor_bg} size="3xl">
          Bio-Logic
        </Text>
        <Text
          style={fonts_styles.bold}
          color={colors.txtColor_bg}
          marginBottom={20}
          size="xl">
          {name} Your Shifts will be end In
        </Text>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: colors.txtColor_bg,
            }}>
            {formatTimeLeft(timeLeft)}
          </Text>
          <Text style={{fontSize: 18, color: colors.txtColor_bg}}>
            left until end of shift
          </Text>
        </View>
      </ScrollView>
      <VStack padding={20}>
        {/* //{timeLeft === 0 && ( */}
        <CustomButton
          marginTop={30}
          action={handleSubmit}
          backgroundColor={colors.danger}
          text="End"
          textColor={colors.white}
        />
        {/* )} */}
      </VStack>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
        size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Thank you</Heading>
            <ModalCloseButton>{/* <Icon /> */}</ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {/* <Text size="sm">
                Elevate user interactions with our versatile modals. Seamlessly
                integrate notifications, forms, and media displays. Make an
                impact effortlessly.
              </Text> */}
          </ModalBody>
          <ModalFooter>
            {/* <Button
                title="Cancel"
                onPress={() => {
                  setShowModal(false);
                }}></Button> */}

            <Button
              backgroundColor={colors.success}
              onPress={() => {
                navigation.navigate('Home');
                setShowModal(false);
              }}
              size="lg"
              variant="solid" // Solid filled button for Start
            >
              <ButtonText>Ok</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
});
export default ShiftTimer;
