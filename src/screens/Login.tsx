import React, {useState} from 'react';

import {
  Image as ImageView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from '../components/icon/IconPack';
import {AlertCircle} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  Box,
  VStack,
  Input,
  InputField,
  InputSlot,
  Spinner,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signIn} from 'aws-amplify/auth';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [usernameInput, setUserName] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleChangeSpace = (newString: string) => {
    const textWithoutSpaces = newString.replace(/\s+/g, '');
    return textWithoutSpaces;
  };

  async function userSignIn({username2, password2}) {
    try {
      const {isSignedIn} = await signIn({
        username: username2,
        password: password2,
      });
      console.log('Signed', isSignedIn);
      navigation.navigate('Home');

    } catch (error) {
      console.log('error signing in', error);
      setIsError(true);
      const message = error.toString().split(':').pop().trim();
      setErrMsg(message);
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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schema}
            onSubmit={values => {
              console.log('sss');

              setUserName(values.email);
              setPassword(values.password);
              console.log(values);
              console.log(
                'Changed value',
                usernameInput,
                passwordInput,

                values.email,
                values.password,
              );
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
                space={errors.email || errors.password ? 'sm' : 'xl'}
                p={30}>
                <Box style={[styles.container]}>
                  <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                    {'Name'}
                  </Text>
                  <Input>
                    <InputField
                      onChangeText={text => {
                        handleChange('email')(text);
                      }}
                      onBlur={handleBlur('email')}
                      value={handleChangeSpace(values.email)}
                      placeholder="Username"
                      placeholderTextColor={'#a6a6a6'}
                    />
                    <InputSlot pr="$3">
                      {touched.email && errors.email ? (
                        <AlertCircle color={'red'} size={27} />
                      ) : (
                        <Icon type="user" color={'#C9C9C9'} />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.email && errors.email && (
                    <Text color="red">{errors.email}</Text>
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
                <VStack>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ForgetPassword');
                    }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                
                <TouchableOpacity
                  disabled={isLoading}
                  style={styles.loginButton}
                  onPress={() => {
                    handleSubmit();
                    userSignIn({
                      username2: handleChangeSpace(values.email),
                      password2: handleChangeSpace(values.password),
                    });
                  }}>
                  {isLoading ? (
                    <Spinner size="small" />
                  ) : (
                    <Text style={styles.btnText}>Login</Text>
                  )}
                </TouchableOpacity>
                </VStack>
                {isError && (
                  <Box style={{alignSelf: 'center', marginTop: 10}}>
                    <Text style={{color: 'red'}}>{errMsg}</Text>
                  </Box>
                )}
              </VStack>
            )}
          </Formik>
            
          <Box style={[styles.signupContainer, { flex: 1 }]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <Text style={styles.signupText}>
                  Don't have an account?{' '}
                  <Text style={styles.boldText}>Signup</Text>
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
    minHeight: height / 4,
    maxHeight: height / 3,
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

export default Login;
