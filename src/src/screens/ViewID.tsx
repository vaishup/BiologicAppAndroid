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
import QRCode from 'react-native-qrcode-svg';

import {colors} from '../styles/colors';
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import {useAuth} from '../navigation';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {generateClient} from 'aws-amplify/api';
import {getTableID} from '../hooks/authServices.tsx';
import Geolocation from 'react-native-geolocation-service';
import Header from '../components/Header.tsx';
import {Image} from '@gluestack-ui/themed';

import {listTheShifts, getTheStaff} from '../graphql/queries';
const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;
import dayjs from 'dayjs';
import {Client} from 'undici-types';
import * as mutation from '../graphql/mutations.js';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  uploadToS3,
  downloadFromS3,
  handleProgressUpdate,
} from '../utils/utilityFunctions';
const ViewID = ({navigation}: any) => {
  const ref = React.useRef(null);
  const [name, setName] = useState('');
  const [empID, setEmpID] = useState('');
  const [userID, setUserID] = useState('');
  const client = generateClient();
  const [fileUri, setFileUri] = useState<string | null>(null);

  const getUser = async () => {
    const userId = await getTableID();
    console.log('Fetched user ID:', userId); // Debug log to check userId

    if (userId) {
      setUserID(userId); // Correctly set user ID
      console.log('UserID set to:', userId); // Debug log to confirm state update
    } else {
      console.error('getTableID did not retuError updating staff...rn a valid user ID.');
    }
//5VFlLjq17C
    try {
      console.log('Fetching staff with ID:', userId);
      const staffData = await client.graphql({
        query: getTheStaff,
        variables: {id: userId},
      });
      const staff = staffData.data.getTheStaff;
      setName(staff.name);
      setEmpID(staff.employeeId);
      console.log('Fetched staff data:', staff.id); // Debug log
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };
  const size_sm = 130;

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []), // Empty dependency array ensures it runs only when the screen comes into focus
  );

  useEffect(() => {
    const downloadFile = async () => {
      await downloadFromS3({
        folder: 'userprofile',
        subFolder: 'selfie',
        setFileUrl: url => {
          setFileUri(url);
        },
      });
      //setIsLoading(false);
    };
    downloadFile();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        {/* Header */}
        <Header title="Share ID Information" />

        {/* Main Content */}
        <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
          <VStack style={{flex: 1, alignItems: 'center'}}>
            {/* User Photo */}
            <Image
              alt="xwallet"
              source={fileUri ? {uri: fileUri} : require('../assets/user.png')} // Fallback to placeholder
              resizeMode="cover"
              style={{
                height: size_sm,
                width: size_sm,
                borderRadius: 1000,
                overflow: 'hidden',
                marginBottom: 0,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                marginTop: 10,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {name}
            </Text>

            <Text
              style={{
                fontSize: 24,
                marginTop: 10,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {`ID: ${empID ?? '0'}`}
            </Text>

            {/* User Details */}
            {/* <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 }}>
            Place this code in front of the reader to initiate transaction
          </Text> */}

            {/* QR Code */}
            <VStack marginTop={80}>
              {userID ? (
                <QRCode
                  value={`https://main.d3a2pgixbnwzgo.amplifyapp.com/dashboard/${userID}`}
                  size={200}
                />
              ) : (
                <Text>Loading QR code...</Text>
              )}
            </VStack>
          </VStack>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              alt="xwallet"
              source={require('../assets/royal.jpeg')}
              resizeMode="cover"
              style={{
                height: size_sm,
                width: size_sm,
                overflow: 'hidden',
              }}
            />
            {/* <Text
              style={{
                fontSize: 24,
                marginTop: 10,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {'BY  ROYAL EMPLOYMENT'}
            </Text> */}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffff',
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
    color: '#6B7280',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  grenStyle: {
    fontSize: 16,
    width: '30%',
    padding: 4,
    color: '#374151',
    borderRadius: 10, // Ensure this is half of the width or height
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
    backgroundColor: '#E5E7EB', // Add background color
    overflow: 'hidden', // Ensure content stays inside the rounded border
  },
  activeTabText: {
    textTransform: 'uppercase', // All caps text

    fontWeight: 'bold',
    color: '#007399', // Blue text for active tab
  },
  tabsContainer: {
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
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
    borderBottomColor: '#007399', // Line color
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  tabText: {
    textTransform: 'uppercase', // All caps text
    backgroundColor: '#F3F4F6', // Default background
    color: '#374151', // Default text color for inactive tab
  },

  statusContainer: {
    padding: 10, // Padding for the container
    borderRadius: 8, // Rounded corners
    marginVertical: 5, // Space between items
    alignItems: 'center', // Center the text horizontally
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Default text color (white for both statuses)
  },
  pending: {
    backgroundColor: 'yellow', // Yellow background for Pending status
    color: 'black', // Optional: Black text on yellow for better readability
  },
  completed: {
    backgroundColor: 'green', // Green background for Completed status
    color: 'white', // White text on green background
  },
  itemDescriptionss: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  greenStyle: {
    width: '30%',
    color: '#ffffff', // Dark text color
    backgroundColor: '#4CAF50', // Green background
  },
  yellowStyle: {
    width: '30%',
    color: '#374151', // Dark text color
    backgroundColor: '#FFC107', // Yellow background
  },
  grayStyle: {
    width: '30%',
    color: '#6B7280', // Gray text color
    backgroundColor: '#E5E7EB', // Light gray background
  },

  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#757575',
    fontWeight: 'bold',
  },
});
export default ViewID;
