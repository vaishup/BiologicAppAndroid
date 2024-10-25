import React, {useState} from 'react';

import {Image as ImageView, Dimensions, StyleSheet} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';
import {AuthUser} from 'aws-amplify/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from '../components/IconPack';
import {
  Text,
  Box,
  VStack,
  Input,
  InputField,
  InputSlot,
  Spinner,
  Heading,
} from '@gluestack-ui/themed';
import {Mail, AlertCircle} from 'lucide-react-native';
import {resetPassword} from 'aws-amplify/auth';

import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigation = useNavigation();

  //------------------yup validation and password show /hide functions-------------------------
  const schema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Invalid email'),
    email: Yup.string().email('Invalid email').required('Email required'),
  });
  //------------------AWS auth amplify handleResetPassword functions-------------------------
  async function handleResetPassword(username: string) {
    try {
      const output = await resetPassword({username});
      console.log('nexStep', output);
      handleResetPasswordNextSteps(output, username);
    } catch (error) {
      console.log('error signing in', error);
      setIsError(true);
      const message = error.toString().split(':').pop().trim();
      if (message === 'Username/client id combination not found.') {
        const messages = 'User Not Found';
        setErrMsg(messages);
      } else {
        setErrMsg(message);
      }
    }
  }

  function handleResetPasswordNextSteps(output: any, username: string) {
    const {nextStep} = output;
    console.log('nexStep', nextStep);
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
        );
        navigation.navigate('OTP', {
          forgetPassword: true,
          username: username,
        });

        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
    // navigation.navigate('OTP', {
    //   forgetPassword: true,
    //   username:email,
    // });
  }

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'never'}}>
        <Box>
          <ImageView
            alt="Logo Styles"
            source={require('../assets/logo.png')}
            style={styles.imageStyle}
          />
          <Heading color="#005DAA" justifyContent="center" alignSelf="center">
            Forget Password
          </Heading>
          <Formik
            initialValues={{email: ''}}
            validationSchema={schema}
            onSubmit={values => {
              setEmail(values.email);
              console.log(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <VStack space={errors.email ? 'sm' : 'xl'} p={30}>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Email'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email"
                    />
                    <InputSlot pr="$3">
                      {touched.email && errors.email ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon color={'#C9C9C9'} size={27} type={'mail'} />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.email && errors.email && (
                    <Text color="red">{errors.email}</Text>
                  )}
                </Box>
                <CustomButton
                  action={() => {
                    handleSubmit();
                    handleResetPassword(values.email);
                  }}
                  backgroundColor={colors.primary}
                  text="Forgot Password"
                  textColor={colors.white}
                />
                {isError && (
                  <Box style={{alignSelf: 'center', marginTop: 10}}>
                    <Text style={{color: 'red'}}>{errMsg}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </Formik>
        </Box>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: '#F1F1F1',
  },
  loginButton: {
    borderRadius: 15,
    backgroundColor: '#005DAA',
    width: '90%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotPassword: {
    color: '#005DAA',
    padding: 5,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  signupText: {
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
  },

  signupContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    minHeight: 50,
    maxHeight: 100,
    paddingHorizontal: 20,
  },
  input: {
    position: 'absolute',
    width: 344,
    height: 50,
    borderRadius: 20,
    borderWidth: 0,
    fontSize: 16,
    color: '#3948AA',
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
  },
});

export default ForgetPassword;
