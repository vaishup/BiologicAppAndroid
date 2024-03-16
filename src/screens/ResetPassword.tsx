import React, {useState} from 'react';

import {Image as ImageView, Dimensions, StyleSheet} from 'react-native';
import Icon from '../components/IconPack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';
import {AlertCircle} from 'lucide-react-native';
import {
  Text,
  Box,
  VStack,
  Input,
  InputField,
  InputSlot,
  Heading,
} from '@gluestack-ui/themed';
import * as Yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {confirmResetPassword, updatePassword} from 'aws-amplify/auth';

const {width, height} = Dimensions.get('window');

const ResetPassword = () => {
  const route = useRoute();
  const name = route.params?.email;
  const email = route.params?.email;
  const code = route.params?.code;
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmassword] = useState(false);
  //------------------yup validation and password show /hide functions-------------------------
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleConfirmState = () => {
    setConfirmassword(showState => {
      return !showState;
    });
  };
  const handleChangeSpace = (newString: string) => {
    const textWithoutSpaces = newString.replace(/\s+/g, '');
    return textWithoutSpaces;
  };
  const passPass =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(passPass, 'Password should be alphanumeric (a-z, A-Z, 0-9)')
      .required('Password should be alphanumeric (a-z, A-Z, 0-9)'),
    confirmPassword: Yup.string()
      .matches(passPass, 'Password should be alphanumeric (a-z, A-Z, 0-9)')
      .required('Password should be alphanumeric (a-z, A-Z, 0-9)'),
  });

  //------------------AWS auth amplify handleConfirmResetPassword functions-------------------------
  async function handleConfirmResetPassword({
    username,
    confirmationCode,
    newPassword,
  }) {
    try {
      await confirmResetPassword({username, confirmationCode, newPassword});
      console.log('its updated..');
      navigation.navigate('DrawNavigator');
    } catch (error) {
      console.log('error ResetPwd in', error);
      const message = error.toString().split(':').pop().trim();
    }
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
            source={require('../assets/logo_withName.png')}
            style={styles.imageStyle}
          />
          <Heading color="#005DAA" justifyContent="center" alignSelf="center">
            Reset Password
          </Heading>
          <Formik
            initialValues={{
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={schema}
            onSubmit={(values, {setErrors}) => {
              if (values.newPassword !== values.confirmPassword) {
                setErrors({
                  confirmPassword: 'Passwords does not match',
                });
                return;
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <VStack
                space={
                  errors.newPassword || errors.confirmPassword ? 'sm' : 'xl'
                }
                p={30}>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'New Password'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={text => {
                        handleChange('newPassword')(text);
                      }}
                      onBlur={handleBlur('newPassword')}
                      value={handleChangeSpace(values.newPassword)}
                      placeholder="New password"
                      placeholderTextColor={'#a6a6a6'}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputSlot pr="$3" onPress={handleState}>
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon
                          type={showPassword ? 'eye' : 'eyeOff'}
                          color={'#C9C9C9'}
                        />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.newPassword && errors.newPassword && (
                    <Text color="red">{errors.newPassword}</Text>
                  )}
                </Box>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Confirm Password'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={text => {
                        handleChange('confirmPassword')(text);
                      }}
                      onBlur={handleBlur('confirmPassword')}
                      value={handleChangeSpace(values.confirmPassword)}
                      placeholder="Confirm Password"
                      placeholderTextColor={'#a6a6a6'}
                      type={confirmPassword ? 'text' : 'password'}
                    />
                    <InputSlot pr="$3" onPress={handleConfirmState}>
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon
                          type={confirmPassword ? 'eye' : 'eyeOff'}
                          color={'#C9C9C9'}
                        />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text color="red">{errors.confirmPassword}</Text>
                  )}
                </Box>
                <CustomButton
                  action={() => {
                    handleSubmit();
                  }}
                  backgroundColor={colors.primary}
                  text="Forgot Password"
                  textColor={colors.white}
                />
              </VStack>
            )}
          </Formik>
          <VStack space={'xl'} p={30}></VStack>
          <Box style={styles.container}>
            <VStack p={10}></VStack>
          </Box>
        </Box>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    height: height / 4.9,
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

export default ResetPassword;
