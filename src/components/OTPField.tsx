import {useEffect, useRef, useState} from 'react';
import {HStack, Box, Text, Spinner, VStack} from '@gluestack-ui/themed';
import Icon from './IconPack';
import {
  Alert,
  Keyboard,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import { Auth } from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';
import {OtpInput} from 'react-native-otp-entry';
import {confirmSignUp} from 'aws-amplify/auth';
import {resendSignUpCode} from 'aws-amplify/auth';
import * as mutations from '../graphql/mutations';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';
import { resetPassword } from 'aws-amplify/auth';

import {
  signUp,
  signIn,
  fetchUserAttributes,
  getCurrentUser,
  updateUserAttributes,
  updateUserAttribute,
  signOut,
} from '@aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';

import {useAuth} from '../navigation';
/* 

style: Custom style of input wrapper (e.g. {{padding: 10}})
username: Pass by sign up page
code: Pass by sign up page
*/

interface inputProps {
  style?: StyleProp<ViewStyle>;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  code?: string;
  acceptTerms?: boolean;
 forgetPassword: boolean;
  isResetPassword?: Boolean;
}
const {height} = Dimensions.get('window');

const OTPField = (props: inputProps) => {
  const OTP = () => {
  const forgetPassword = props?.forgetPassword;
   
    const isResetPassword = props?.isResetPassword;
    const [err, setErr] = useState(false);
    const [enterCode, setEnterCode] = useState('');
    const [counter, setCounter] = useState(59);
    const [num, setNum] = useState('0');
    const [resendCheck, setResendCheck] = useState(true);
    const {setIsUserAuth} = useAuth();

    const navigation = useNavigation();
    const {height} = Dimensions.get('window');
    const [email, setEmail] = useState('');;
    const [otpError, setOtpError] = useState('');
    const API = generateClient();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [tableID, setTableID] = useState('');
    useEffect(() => {
      setEmail(props.email)
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter == 0) {
        setResendCheck(false);
      }
      return () => {
        clearInterval(timer as NodeJS.Timeout);
      };
    }, [counter]);
    async function updateCustomAttribute(newAttributeValue: any) {
      try {
        // Assuming `getCurrentUser` returns a user object similar to what AWS Amplify Auth.currentAuthenticatedUser() would return
        const user = await getCurrentUser();

        // Construct the input object expected by `updateUserAttribute'
        const input = {
          userAttribute: {
            attributeKey: 'custom:TableID', // The key of the attribute you want to update
            value: newAttributeValue, // The new value for the custom attribute
          },
          options: {},
        };

        // Call `updateUserAttribute` with the constructed input
        const result = await updateUserAttribute(input);

        console.log('Attribute update result: ', result);
      } catch (error) {
        console.error('Error updating user attributes:', error);
      }
    }
    const handleResendCode = async ({ email, username }) => {
      console.log(email, "email");
      try {
        const { destination, deliveryMedium, attributeName } = 
        await resendSignUpCode({ username });
        console.log(destination, deliveryMedium, attributeName);
      } catch (error) {
        console.log('error signing in', error);
        const message = error.toString().split(':').pop().trim();
      }
    }
  
    const handleOtpSubmit = async (username: string, code: string) => {
      try {
        const response = await confirmSignUp({
          username: username,
          confirmationCode: code,
        });
        await signIn({
          username: props.email, // Assuming this is the email or username used for sign-up
          password: props.password, // You might need to manage password differently
        });

        // Use userId for the id field in the input
        const input = {
          name: props.username,
          email: props.email,
          phoneNumber: props.phoneNumber,
          termsAndConditionsAccepted: acceptTerms,
          privacyPolicyAcknowledged: acceptTerms,
          indentificationVerified: false,
        };
        // Call the createUserModel mutation with the input
        const createUser = await API.graphql({
          query: mutations.createUser,
          variables: {input},
        });

        console.log(
          'User added to the database',
          createUser.data.createUser.id,
        );
        setTableID(createUser.data.createUser.id);
        // Update the custom attribute before navigating to the dashboard
        await updateCustomAttribute(createUser.data.createUser.id);
        // Navigate to the Dashboard page
        setOtpError('');
        setIsUserAuth(true);
        navigation.navigate('DrawNavigator');
        //onLoginSuccess();
      } catch (error) {
        console.error('Error verifying OTP', error);
        setOtpError('Failed to verify OTP. Please try again.');
      }
    };
  
  
    return (
      <VStack style={styles.container} justifyContent="space-between">
        <HStack
          style={[styles.otpContainer, props.style]}
          justifyContent="space-around">
          <VStack style={{width: 300}}>
            <OtpInput
              numberOfDigits={6}
              // hideStick
              onTextChange={text => {
                setEnterCode(text);
              }}
              theme={{
                pinCodeTextStyle: styles.pinCodeText,
                pinCodeContainerStyle: styles.pinCodeContainer,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
          </VStack>
        </HStack>
        <VStack style={styles.btnWrapper}>
          <Box style={styles.errMsgContainer}>
            {err && ( // Display only when error exist
              <HStack>
                <Icon type="error" color="#E62B2B" />
                <Text style={{color: '#E62B2B', marginLeft: 6}}>
                  Invalid code
                </Text>
              </HStack>
            )}
          </Box>
          {otpError && (
            <Text style={{color: 'red', alignSelf: 'center'}}>
              Invalid OTP Code. Please verify again.
            </Text>
          )}

          {/* <Box style={{alignItems: 'center', marginVertical: 10}}>
            <Button
              title="Resend Code"
              isDisabled={resendCheck}
              btnStyle={{backgroundColor: '#E4962F'}}
              action={() => {
                resendConfirmationCode(props.username);
                if (counter == 0) {
                  setCounter(59);
                  setResendCheck(true);
                }
              }}></Button>
          </Box> */}
          <VStack space="md">
            <HStack style={styles.timeCounter}>
              <Text style={{color: '#3948AA'}}>
                You can request a new code after 00:
                {counter < 10 && num}
                {counter}
              </Text>
            </HStack>
            <CustomButton
              action={() => {
                // console.log("prpos.email.", props.email);
                // console.log("prpos.email.", props.username);
                
                handleResendCode({ email: 'fdf@gmail.com', username: 'someUsername' })              }}
              backgroundColor={colors.yellow}
              text="Resend OTP!"
              textColor={colors.white}
            />
            <CustomButton
              action={() => {
                if (forgetPassword) {
                  console.log("email", props.username);
                
                  navigation.navigate('ResetPassword', {
                    forgetPassword: true,
                    email: props.username,
                    code: enterCode
                  });
                } else {
                  handleOtpSubmit(props.email, enterCode);
                }
              }}
              backgroundColor={colors.primary}
              text="It's Really Me!"
              textColor={colors.white}
            />
          </VStack>

          {/* <Button
              title="It's Really Me!"
              action={() => {
                // Confirm sign-up from server
                // If success, navigate to home
                // Otherwise, show err message
                console.log('otp code', enterCode);
                console.log('Forge', forgetPassword, enterCode);
                forgetPassword
                  ? navigation.navigate('Resetpwd', {
                      code: enterCode,
                      username: props.username,
                    })
                  : isResetPassword
                  ? navigation.navigate('SettingResetPwdConfirm', {
                      code: enterCode,
                      username: props.username,
                      phone: phoneNum,
                    })
                  : socialSignUp === true
                  ? confirmSocialSignUp(props.username, enterCode)
                  : confirmSignUp(props.username, enterCode);
              }}></Button> */}
        </VStack>
      </VStack>
    );
  };

  return <OTP />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  otpContainer: {
    paddingHorizontal: 30,
    paddingVertical: height / 7,
  },
  btnWrapper: {
    paddingBottom: '5%',
  },
  errMsgContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  timeCounter: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pinCodeText: {
    color: '#3948AA',
    fontSize: 24,
  },
  pinCodeContainer: {
    height: 100,
    borderRadius: 40,
  },
  activePinCodeContainer: {
    borderColor: '#DCDCDC',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: '#F1F1F1',
    fontWeight: 'bold',
  },
  blueButton: {
    borderRadius: 15,
    backgroundColor: '#007ee6',
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  yellowButton: {
    borderRadius: 15,
    backgroundColor: '#e6bb00',
    width: '100%',
    minHeight: 50,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OTPField;
