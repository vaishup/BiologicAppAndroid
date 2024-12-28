import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, VStack, HStack, ScrollView} from '@gluestack-ui/themed';

import {colors} from '../styles/colors';
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import {useAuth} from '../navigation';
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import {
  Cake,
  Edit,
  EditIcon,
  Mail,
  Pencil,
  Phone,
  User,
} from 'lucide-react-native';
import {Image} from '@gluestack-ui/themed';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getTableID} from '../hooks/authServices.tsx';
import {getTheStaff} from '../graphql/queries';
import {generateClient} from 'aws-amplify/api';
import {
  uploadToS3,
  downloadFromS3,
  handleProgressUpdate,
} from '../utils/utilityFunctions';
import Header from '../components/Header.tsx';
const logo = require('../assets/profile.jpeg');

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;
const size_sm = 130;
const default_stroke = 1.75;

const ViewProfile = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhoneNo] = useState();
  const [dob, setDob] = useState();
  const [profileStatus, setProfileStatus] = useState();
  const API = generateClient();
  const [fileUri, setFileUri] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []), // Empty dependency array ensures it runs only when the screen comes into focus
  );
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
      setEmail(staff.email);
      setPhoneNo(staff.phoneNumber);
      setName(staff.name);
      setDob(staff.DOB);
      console.log('profileStatus...', staff.profileStatus);
      setProfileStatus(staff.profileStatus);
      console.log('staff...s', staff.id);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

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
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <ScrollView
        bounces={false}
        style={{alignSelf: 'center', width: width}}
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: height * 0.9,
        }}>
        {/* <Header title="Profile" /> */}
        {/* Profile Header Section */}
        <VStack style={styles.profileHeader}>
          <VStack width={width}>
            <Header title="Profile" />
          </VStack>
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
              marginTop: 20,
            }}
          />

          <Text style={styles.profileName}>{name}</Text>
          {/* <Text style={styles.profileTitle}>Senior Graphic Designer</Text> */}

          {(profileStatus?.toLowerCase() === 'pending' ||
            profileStatus?.toLowerCase() === 'incomplete') && (
            <Pencil
              onPress={() => {
                navigation.navigate('EditProfile', {
                  name: name,
                  dob: dob,
                  email: email,
                  phone: phone,
                });
              }}
              color={'black'}
              style={{
                position: 'absolute',
                top: 35,
                right: 23,
              }}
            />
          )}
        </VStack>

        {/* Social Media Links Section */}
        <View style={styles.socialContainer}>
          <VStack space="md">
            <View style={styles.socialRow}>
              <VStack>
                <HStack>
                  <Mail color={colors.txtColor_bg} />
                  <Text style={styles.socialLabel} marginLeft={10}>
                    Email
                  </Text>
                </HStack>

                <Text style={styles.socialValue} marginLeft={35}>
                  {email}
                </Text>
              </VStack>
            </View>
            <View style={styles.socialRow}>
              <VStack>
                <HStack>
                  <Phone color={colors.txtColor_bg} />
                  <Text style={styles.socialLabel} marginLeft={10}>
                    Phone
                  </Text>
                </HStack>

                <Text style={styles.socialValue} marginLeft={35}>
                  {phone}
                </Text>
              </VStack>
            </View>

            <View style={styles.socialRow}>
              <VStack>
                <HStack>
                  <Cake color={colors.txtColor_bg} />
                  <Text style={styles.socialLabel} marginLeft={10}>
                    DOB
                  </Text>
                </HStack>

                <Text style={styles.socialValue} marginLeft={35}>
                  {dob}
                </Text>
              </VStack>
            </View>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: colors.gray2,
    borderRadius: 20,
    padding: 20,
    margin: 3,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 3,
    marginBottom: 15,
  },
  profileName: {
    marginTop: 17,
    fontSize: 24,
    color: colors.txtColor_bg,
    fontWeight: 'bold',
  },
  profileTitle: {
    fontSize: 16,
    color: colors.txtColor_bg,
    marginBottom: 10,
  },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  followers: {
    color: colors.white,
    fontSize: 16,
  },
  following: {
    color: colors.white,
    fontSize: 16,
  },
  socialContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  socialLabel: {
    fontSize: 16,
    color: colors.iconColor,
  },
  socialValue: {
    fontSize: 16,
    color: colors.txtColor_bg,
  },
});

export default ViewProfile;
