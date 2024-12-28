import React from 'react';
import {ScrollView, Text, VStack, Heading} from '@gluestack-ui/themed';
import {Dimensions, StyleSheet, Image as ImageView} from 'react-native';
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
  const phone_number = route.params?.phone_number;
  const password = route.params?.password;
  const email = route.params?.email;
  const acceptTerms = route.params?.acceptTerms;
  const forgetPassword = route.params?.forgetPassword;
  const accountType = route.params?.accountType;
console.log("OTP",phone_number);

  return (
    <SafeAreaView style={{backgroundColor: '#f1f1f1'}}>
      <ScrollView>
        <VStack justifyContent="space-between">
          <ImageView
            alt="Logo Styles"
            source={require('../assets/logo.png')}
            style={styles.imageStyle}
          />
          <Heading style={{justifyContent: 'center', alignSelf: 'center'}}>
            Let's confirm it's really you
          </Heading>

          <Text style={{textAlign: 'center', color: '#325FD5'}}>
            {forgetPassword
              ? `Enter the code sent to your phone number`
              : `Enter the code sent to ${phone_number}`}
          </Text>
          <OTPField
            username={username}
            acceptTerms={!acceptTerms}
            email={email}
            phoneNumber={phone_number}
            password={password}
            code={''}
            accountType={accountType}
            forgetPassword={forgetPassword}
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
});
export default OTP;
