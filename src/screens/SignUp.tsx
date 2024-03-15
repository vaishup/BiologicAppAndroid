import React, {useEffect, useState} from 'react';

import {
  View,
  Text as TextView,
  Image as ImageView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import 'yup-phone';

import Icon from '../components/IconPack';
import {Mail, Check, AlertCircle, Lock, User2} from 'lucide-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Button,
  Text,
  Box,
  Image,
  VStack,
  Input,
  InputField,
  InputSlot,
  HStack,
  ScrollView,
  Modal,
  ModalBackdrop,
  KeyboardAvoidingView,
  Spinner,
  InputIcon,
  Select,
  SelectContent,
  SelectTrigger,
  SelectInput,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectBackdrop,
  Icon as Icons,
  SelectIcon,
  ChevronDownIcon,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import PhoneNumberInput from '../components/PhoneNumberInput';
import {confirmSignUp} from 'aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';
import {signUpUser} from '../hooks/authServices';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';

import {
  signUp,
  signIn,
  fetchUserAttributes,
  getCurrentUser,
  updateUserAttributes,
  updateUserAttribute,
  signOut,
} from '@aws-amplify/auth';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState('+234'); // Default selected phone code
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [username, setUsername] = useState('');


  const navigation = useNavigation();

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const passPass =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

  const schema = Yup.object().shape({
    userName: Yup.string().required('Name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    // phone: Yup.string().matches(phoneRegExp, 'Invalid phone'),
    phone_number: Yup.string()
      .matches(phoneRegExp, 'Invalid phone')
      .required('Invalid phone'),
    password: Yup.string()
      .matches(passPass, 'Password should be alphanumeric (a-z, A-Z, 0-9)')
      .required('Password should be alphanumeric (a-z, A-Z, 0-9)'),
    acceptTerms: Yup.boolean()
      .required('You must accept the Terms of Service')
      .oneOf([true], 'You must accept the Terms of Service'),
  });

  const handleChangeSpace = (newString: string) => {
    const textWithoutSpaces = newString.replace(/\s+/g, '');
    return textWithoutSpaces;
  };
  async function updateCustomAttribute(newAttributeValue) {
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

  // signup function is here
  async function handleSignUp(values) {
    const fullPhoneNumber = `${selectedPhoneCode}${values.phone_number.replace(
      /\D/g,
      '',
    )}`;
    console.log('fullPhoneNumber', fullPhoneNumber);
    console.log('values', values);
    console.log('selectedPhoneCode', selectedPhoneCode);

    //console.log(values);
    try {
      // Await the signUpUser call and capture the signUpResponse
      const signUpResponse = await signUpUser({
        username: values.email, // Assuming username is the email
        password: values.password,
        email: values.email,
        phone_number: fullPhoneNumber,
        autoSignIn: {enabled: false},
      });
      console.log('Success', signUpResponse);
      setUsername(values.email);
      setIsOtpStage(true);
      navigation.navigate('OTP', {
        phone_number: fullPhoneNumber,
        username: values.userName,
        password: values.password,
        email: values.email,
        acceptTerms: values.acceptTerms,
      });
    } catch (error) {
      console.log('Error', error);
    }
  }
  useEffect(() => {
    // Add a listener for when the component is focused
    //handleSignOut()
  }, []);
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{flex: 1}}>
        <Box>
          <ImageView
            alt="Logo Styles"
            source={require('../assets/logo_withName.png')}
            style={styles.imageStyle}
          />
          <Formik
            initialValues={{
              email: '',
              userName: '',
              phone_number: '',
              password: '',
            }}
            validationSchema={schema}
            onSubmit={values => {
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
              <VStack space={'xl'} p={30}>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Name'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      value={values.userName}
                      placeholder=" Name"
                    />
                    <InputSlot pr="$3">
                      {touched.userName && errors.userName ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon color={'#C9C9C9'} size={27} type={'user'} />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.userName && errors.userName && (
                    <Text color="red">{errors.userName}</Text>
                  )}
                </Box>
                {/* <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Last Name'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      value={values.lastname}
                      placeholder="Last Name"
                    />
                    <InputSlot pr="$3">
                      {touched.lastname && errors.lastname ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon color={'#C9C9C9'} size={27} type={'user'} />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.lastname && errors.lastname && (
                    <Text color="red">{errors.lastname}</Text>
                  )}
                </Box> */}
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Email'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('fullName')}
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
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Phone Number'}
                  </Text>
                  <HStack space="sm">
                    <Select
                      style={{
                        width: '33%',
                        borderRadius: 10,
                        backgroundColor: '#f2f2f2',
                        borderColor: '#cccccc',
                      }}
                      selectedValue={selectedPhoneCode}
                      onValueChange={itemValue =>
                        setSelectedPhoneCode(itemValue)
                      }>
                      <SelectTrigger variant="outline" size="md">
                        <SelectInput />
                        <SelectIcon
                          style={{
                            backgroundColor: 'transparent',
                            marginRight: 5,
                            padding: 8,
                          }}>
                          <Icons as={ChevronDownIcon} />
                        </SelectIcon>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <SelectItem label="+234" value="+234" />
                          <SelectItem label="+1" value="+1" />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                    <Input style={{borderRadius: 5, width: '66%', height: 42}}>
                      <InputField
                        onChangeText={handleChange('phone_number')}
                        onBlur={handleBlur('phone_number')}
                        value={values.phone_number}
                        placeholder="Phone Number"
                      />
                      <InputSlot pr="$3">
                        {touched.phone_number && errors.phone_number ? (
                          <AlertCircle color={'red'} size={27} />
                        ) : (
                          <Icon color={'#C9C9C9'} size={27} type={'phone'} />
                        )}
                      </InputSlot>
                    </Input>
                  </HStack>
                  {touched.phone_number && errors.phone_number && (
                    <Text color="red">{errors.phone_number}</Text>
                  )}
                </Box>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Password'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={handleChangeSpace(values.password)}
                      placeholder="Password"
                      placeholderTextColor={'#a6a6a6'}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputSlot pr="$3" onPress={handleState}>
                      {touched.password && errors.password ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon
                          type={showPassword ? 'eye' : 'eyeOff'}
                          color={'#C9C9C9'}
                        />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.password && errors.password && (
                    <Text color="red">{errors.password}</Text>
                  )}
                </Box>
                <Field name="acceptTerms" type="checkbox">
                  {({field}: {field: any}) => (
                    <Checkbox
                      value="Eng"
                      aria-label="Close"
                      size="sm"
                      style={{paddingVertical: height / 68}}
                      isInvalid={false}
                      onChange={() =>
                        setFieldValue('acceptTerms', !field.value)
                      }>
                      <CheckboxIndicator borderColor="#C9C9C9" mr="$2">
                        <CheckboxIcon as={Check} backgroundColor="#008000" />
                      </CheckboxIndicator>
                      <CheckboxLabel style={{color: '#3948AA', fontSize: 14}}>
                        Accept our Terms & Conditions to continue
                      </CheckboxLabel>
                    </Checkbox>
                  )}
                </Field>

                <VStack>
                  <CustomButton
                    action={() => {
                      handleSubmit();
                      handleSignUp(values);
                    }}
                    backgroundColor={colors.primary}
                    text="Sign Up"
                    textColor={colors.white}
                  />
                </VStack>
              </VStack>
            )}
          </Formik>
          <Box style={styles.signupContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.signupText}>
                Already have an account?{' '}
                <Text style={styles.boldText}>Login</Text>
              </Text>
            </TouchableOpacity>
          </Box>
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
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotPassword: {
    color: '#005DAA',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingBottom: 10,
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

export default SignUp;
