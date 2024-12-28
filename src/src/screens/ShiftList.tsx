import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  VStack,
  HStack,
  ScrollView,
  Center,
  Heading,
} from "@gluestack-ui/themed";

import { colors } from "../styles/colors";
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import { useAuth } from "../navigation";
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { generateClient } from "aws-amplify/api";
import { getTableID } from "../hooks/authServices.tsx";

import Geolocation from "react-native-geolocation-service";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { openSettings } from "react-native-permissions";
import Header from "../components/Header.tsx";
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
} from "@gluestack-ui/themed";
import { listTheShifts, getTheStaff, getLocation } from "../graphql/queries";
const { width: screenW, height: screenH } = Dimensions.get("window");
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;
import dayjs from "dayjs";
import { Client } from "undici-types";
import * as mutation from "../graphql/mutations.js";
import customParseFormat from "dayjs/plugin/customParseFormat";

const ShiftList = ({ navigation }: any) => {
  const ref = React.useRef(null);
  const [startTime, setStartTime] = useState([]); // State to store the selected date
  const [endTime, setEndTime] = useState("");

  const { setIsUserAuth } = useAuth();
  //   async function handleSignOut() {
  //     try {
  //       await signOut();
  //       setIsUserAuth(false);
  //     } catch (error) {
  //       console.log('Error signing out: ', error);
  //     }
  //   }
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [shiftList, setShiftList] = useState([]);
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [location, setLocation] = useState(null);
  const [latitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [address, setAddress] = useState(null);
  const client = generateClient();
  const [activeTab, setActiveTab] = useState("upcoming"); // Tab state
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Filter shifts based on active tab
  console.log("shiftList", shiftList);
  dayjs.extend(customParseFormat);

  const filteredShifts = shiftList.filter((shift) => {
    const currentTime = dayjs(); // Get the current time

    const currentDayjs = dayjs(currentTime, "YYYY-MM-DD hh:mm A");
        const shiftDayjs = dayjs(shift.startDate, "YYYY-MM-DD hh:mm A");

     

    // Compare based on activeTab
    if (activeTab === "upcoming") {
      return shiftDayjs.isAfter(currentDayjs); // Upcoming shifts
    }
    return shiftDayjs.isBefore(currentDayjs); // Previous shifts
  });
  console.log("filteredShifts", filteredShifts);

  const handleStart = async () => {
    const userId = await getTableID();
    console.log(userId);

    try {
      // Step 2: Create the input object for staff creation or update
      const staffInput = {
        id: userId,
        Location: address,
        IsActive: "Online",
        latitude: latitude,
        longitude: longitude,
        // Add other fields as needed
      };
      console.log("Staff Input:", staffInput);
      let staffResponse;
      // Update existing staff member
      staffResponse = await client.graphql({
        query: mutation.updateTheStaff,
        variables: {
          input: staffInput,
        },
      });

      // Debug the API response
      console.log("Staff Response:", staffResponse);

      // Step 3: Handle the response and navigation
      const createdItem = staffResponse.data.updateTheStaff;
      const shiftsInput = {
        id: shiftId,
        shiftstatus: "Start",
        checkInTIme: dayjs().format("YYYY-MM-DD hh:mm A"),

        // Add other fields as needed
      };
      console.log("Staff Input:", shiftsInput);
      let shiftResponce;
      // Update existing staff member
      shiftResponce = await client.graphql({
        query: mutation.updateTheShifts,
        variables: {
          input: shiftsInput,
        },
      });
      setShowModal(false);
      navigation.navigate("ShiftTimer", {
        id: shiftId,
        startTime: shiftStartTime,
        endTime: shiftEndTime,
      });
      console.log(createdItem.id, "successfully created/updated");
    } catch (error) {
      console.error("Error creating or updating staff:", error);
    }
  };
  const requestBackgroundLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 29) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: "Background Location Permission",
          message:
            "This app needs background location access to track your location when you are not using the app.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Background location permission granted");
      } else {
        console.log("Background location permission denied");
      }
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission Required",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        console.log("Permission status:", granted); // Log the result
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          getLocations(); // Call the location function here
        } else {
          console.log("Location permission denied");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocations = () => {
    // if (!permissionGranted) {
    //   console.log('Location permission not granted');
    //   return;
    // }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("Current location:", latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.log("Error getting location:", error.message, error); // Log the full error object
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };
  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = "AIzaSyANjd568jfPoqsh1IJVm6FHWOu7kmOHCEo"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        console.log("Formatted address:", formattedAddress);
      } else {
        console.log("No address found");
      }
    } catch (error) {
      console.log("Error with reverse geocoding:", error);
    }
  };
  useEffect(() => {
    listStaff();
    requestLocationPermission();
    requestBackgroundLocationPermission();
    requestLocationPermissionIOS();
    getUser();
  }, []);

  const listStaff = async () => {
    const userId = await getTableID();
    try {
      const staffdata = await client.graphql({
        query: listTheShifts,
        variables: {
          filter: {
            staffId: {
              eq: userId, // Apply the filter for staffId equal to userId
            },
          },
        },
      });

      const shiftsList = staffdata.data.listTheShifts.items;

      // Fetch location names for each shift
      const shiftsWithLocation = await Promise.all(
        shiftsList.map(async (shift) => {
          try {
            const locationData = await client.graphql({
              query: getLocation,
              variables: { id: shift.locationID }, // Fetch location using locationId
            });

            const locationName = locationData.data.getLocation.name; // Extract location name
            return {
              ...shift, // Keep existing shift data
              locationName, // Add the location name to the shift
            };
          } catch (error) {
            console.error(
              `Error fetching location for shift ID: ${shift.id}`,
              error
            );
            return {
              ...shift,
              locationName: "Unknown", // Fallback if location fetch fails
            };
          }
        })
      );

      // Sort the tasks by createdAt date
      const sortedTasks = shiftsWithLocation.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log("sortedTasks", sortedTasks);

      setShiftList(sortedTasks); // Update the state with the shifts
      console.log("Updated shifts with location names:", shiftsWithLocation);
    } catch (error) {
      console.error("Error fetching shifts or staff details:", error);
    }
  };

  useEffect(() => {
    const checkShifts = () => {
      const currentTime = dayjs(); // Get the current time
      const formattedCurrentTime = currentTime.format("YYYY-MM-DD HH:mm A");

      //console.log('Formatted Current Time:', formattedCurrentTime);

      for (let i = 0; i < shiftList.length; i++) {
        const shift = shiftList[i];
        console.log("Start Date:", shift.startDate);

        // Parse the shift's start time and format it to the same format
        const shiftStartTime = dayjs(shift.startDate);
        console.log("shiftStartTime", shift.startDate);
        console.log("formattedCurrentTime", formattedCurrentTime);

        // console.log('Formatted Shift Start Time:', shiftStartTime);
        const currentDayjs = dayjs(formattedCurrentTime, "YYYY-MM-DD hh:mm A");
        const shiftDayjs = dayjs(shift.startDate, "YYYY-MM-DD hh:mm A");

        // Compare the current time with the shift start time (comparing only up to the minute)
        console.log("currentDayjs", currentDayjs);
        console.log("wws", shiftDayjs);
        if (currentDayjs.isSame(shiftDayjs)) {
          console.log("nkn");
          console.log(formattedCurrentTime);
          console.log(shift.startDat);

          // console.log('Shift matches current time!');
          setLocation(shift.locationName); // Set the shift location for modal
          setShiftStartTime(shiftStartTime); // Set start time for ShiftTimer
          setShiftEndTime(dayjs(shift.endTime).format("YYYY-MM-DDTHH:mm:ss")); // Set end time for ShiftTimer
          setShiftId(shift.id);
          setShowModal(true); // Show the modal
          break;
        }
      }
    };

    // Set interval to check every minute
    const intervalId = setInterval(checkShifts, 30000);
    checkShifts(); // Run immediately on component mount
    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [shiftList]);

  const requestLocationPermissionIOS = async () => {
    if (Platform.OS === "ios") {
      // Request permission for iOS
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "granted") {
        console.log("iOS Location permission granted");
        getGeoLocation(); // Call the function to get location
      } else {
        console.log("iOS Location permission denied");
      }
    } else if (Platform.OS === "android") {
      try {
        // Request permission for Android
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "App Geolocation Permission",
            message: "App needs access to your phone's location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Android Location permission granted");
          getGeoLocation(); // Call the function to get location
        } else {
          console.log("Android Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("Current location ios: ", latitude, longitude);
        reverseGeocode(latitude, longitude);
        setLattitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        // Handle error
        console.error("Error getting location:", error);
        // Alert.alert('Error getting location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const getUser = async () => {
    const userId = await getTableID();
    console.log(userId);

    try {
      console.log("Fetching staff with ID:", userId); // Debug log
      const staffData = await client.graphql({
        query: getTheStaff, // Replace with your actual query to get staff by ID
        variables: { id: userId },
      });
      // console.log(staffData);
      const staff = staffData.data.getTheStaff;
      setName(staff.name);

      console.log("staff...s", staff.id);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <VStack width={width}>
        <Header title="Shifts" />
        <HStack justifyContent="center" space={4} style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => handleTabChange("upcoming")}
            style={activeTab === "upcoming" ? styles.activeTab : styles.tab}
          >
            <Text
              style={
                activeTab === "upcoming" ? styles.activeTabText : styles.tabText
              }
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabChange("previous")}
            style={activeTab === "previous" ? styles.activeTab : styles.tab}
          >
            <Text
              style={
                activeTab === "previous" ? styles.activeTabText : styles.tabText
              }
            >
              Previous
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>

      <ScrollView
        bounces={false}
        style={{ alignSelf: "center", width: width }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          minHeight: height * 0.9,
        }}
      >
        {/* <Text style={fonts_styles.bold} color={colors.txtColor_bg} size="3xl">
          Bio-Logic
        </Text>

        <Text
          style={fonts_styles.bold}
          color={colors.txtColor_bg}
          marginBottom={3}
          size="xl">
          Hi {name}
        </Text>
        <Text
          alignContent="center"
          alignSelf="center"
          style={fonts_styles.bold}
          color={colors.txtColor_bg}
          marginBottom={20}
          size="xl">
          Your Upcomign Shifts
        </Text> */}

        {filteredShifts.length > 0 ? (
          filteredShifts.map((item) => (
            <View key={item?.id} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item?.locationName}</Text>

              <Text style={styles.itemTime}>
                Time: {item.startDate} - {item.endTime}
              </Text>

              <Text style={styles.itemDescription}>{item.duties}</Text>

              <Text
                style={[
                  styles.itemDescriptionss,
                  {
                    width: 200, // Fixed width in pixels
                  },
                  item.shiftstatus === "Completed"
                    ? styles.greenStyle
                    : item.shiftstatus === "Pending"
                    ? styles.yellowStyle
                    : styles.grayStyle, // Default for other statuses
                ]}
              >
                {item.shiftstatus}
              </Text>

              {item.amendment && <Text>{"Note :- " + item.amendment}</Text>}
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          finalFocusRef={ref}
          size="md"
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="md">Your Shift Start soon </Heading>
              <ModalCloseButton>{/* <Icon /> */}</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text size="sm">
                Start your shift
                {/* Elevate user interactions with our versatile modals. Seamlessly
                integrate notifications, forms, and media displays. Make an
                impact effortlessly. */}
              </Text>
            </ModalBody>
            <ModalFooter>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <HStack space={4} justifyContent="center" alignItems="center">
                  <Button
                    marginRight={10}
                    backgroundColor={colors.btnBgColor_secondary}
                    onPress={() => setShowModal(false)}
                    size="lg"
                    variant="solid" // Gives an outline style for Cancel button
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>

                  <Button
                    backgroundColor={colors.success}
                    onPress={handleStart}
                    size="lg"
                    variant="solid" // Solid filled button for Start
                  >
                    <ButtonText>Start</ButtonText>
                  </Button>
                </HStack>
              </View>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#ffff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemTime: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
    fontWeight: "bold",
  },
  grenStyle: {
    fontSize: 16,
    width: "30%",
    padding: 4,
    color: "#374151",
    borderRadius: 10, // Ensure this is half of the width or height
    fontWeight: "bold",
    textAlign: "center", // Center text horizontally
    backgroundColor: "#E5E7EB", // Add background color
    overflow: "hidden", // Ensure content stays inside the rounded border
  },
  activeTabText: {
    textTransform: "uppercase", // All caps text

    fontWeight: "bold",
    color: "#007399", // Blue text for active tab
  },
  tabsContainer: {
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 50,
    paddingLeft: 50,
  },
  activeTab: {
    borderBottomWidth: 2, // Line below active tab
    borderBottomColor: "#007399", // Line color
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  tabText: {
    textTransform: "uppercase", // All caps text
    backgroundColor: "#F3F4F6", // Default background
    color: "#374151", // Default text color for inactive tab
  },

  statusContainer: {
    padding: 10, // Padding for the container
    borderRadius: 8, // Rounded corners
    marginVertical: 5, // Space between items
    alignItems: "center", // Center the text horizontally
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Default text color (white for both statuses)
  },
  pending: {
    backgroundColor: "yellow", // Yellow background for Pending status
    color: "black", // Optional: Black text on yellow for better readability
  },
  completed: {
    backgroundColor: "green", // Green background for Completed status
    color: "white", // White text on green background
  },
  itemDescriptionss: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  greenStyle: {
    width: "40%",
    color: "#ffffff", // Dark text color
    backgroundColor: "#4CAF50", // Green background
  },
  yellowStyle: {
    width: "30%",
    color: "#374151", // Dark text color
    backgroundColor: "#FFC107", // Yellow background
  },
  grayStyle: {
    width: "30%",
    color: "#6B7280", // Gray text color
    backgroundColor: "#E5E7EB", // Light gray background
  },

  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "bold",
  },
});
export default ShiftList;
