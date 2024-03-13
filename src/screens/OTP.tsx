import React from 'react';
import {Box, ScrollView, Text, VStack, Button, Heading} from '@gluestack-ui/themed';
import {Dimensions,StyleSheet  , Image as ImageView,} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPField from '../components/OTPField';
interface OTPProps {
  phone?: string;
  code?: string;
  username?: string;
  forgetPassword?: boolean;
  password?: string;
  isBusinessOwner?: boolean;    
  uID?: string;
  socialSignUp?: boolean;
}


const {height} = Dimensions.get('window');
const OTP = ({phone}: OTPProps) => {
  const route = useRoute();
  const username = route.params?.username;
  const lastname = route.params?.lastname;
  const phone_number = route.params?.phone_number;
  const password = route.params?.password;
  const email = route.params?.email;
//   const forgetPassword = route.params?.forgetPassword;
//   const signUpPassword = route.params?.password;
//   const BusinessOwner = route.params?.isBusinessOwner;
//   const uID = route.params?.uID;
//   const socialSignUp = route.params?.socialSignUp;

  return (
    <SafeAreaView style={{backgroundColor: '#f1f1f1'}}>
      <ScrollView>
        <VStack justifyContent="space-between">
        <ImageView
            alt="Logo Styles"
            source={require('../assets/logo_withName.png')}
            style={styles.imageStyle}
          />
            <Heading style={{justifyContent:'center', alignSelf:'center' }}>Let's confirm it's really you</Heading>
          
          <OTPField
            username={username}
            lastname={lastname}
            email={email}
            phoneNumber={phone_number}
            password={password}
            code={''}
            // forgetPassword={forgetPassword}
            // signUpPassword={signUpPassword}
            // isBusinessOwner={BusinessOwner}
            // uID={uID}
            // socialSignUp={socialSignUp}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    imageStyle: {
      height: height / 4.9,
      // PixelRatio.getPixelSizeForLayoutSize(110)
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center', // top: 25,
      resizeMode: 'contain',
    },
})  
export default OTP;
