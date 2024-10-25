import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {
  Image as ImageView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from '../components/IconPack';
import {AlertCircle} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';
import CustomTextField from '../components/TextField';

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
import {useAuth} from '../navigation';
import {signOut} from 'aws-amplify/auth';
import {getTableID} from '../hooks/authServices.tsx';
import {listTheShifts, getTheStaff} from '../graphql/queries';
import {generateClient} from 'aws-amplify/api';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [usernameInput, setUserName] = useState('tesb0');
  const [passwordInput, setPassword] = useState('kg70gueXjG');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const {setIsUserAuth} = useAuth();
  const route = useRoute();
  const API = generateClient();

  //------------------yup validation and password show /hide functions-------------------------
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
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
  useEffect(() => {
    handleSignOut();
  }, []);
  //------------------AWS auth amplify userSignIn functions-------------------------
  async function userSignIn({username2, password2}) {
    try {
      // Check if there is already a signed-in user

      // Proceed with signing in the new user
      const {isSignedIn} = await signIn({
        username: username2,
        password: password2,
      });
      try {
        const userId = await getTableID();
        console.log('userDetail', userId);
        const staffData = await API.graphql({
          query: getTheStaff, // Replace with your actual query to get staff by ID
          variables: {id: userId},
        });
        const staff = staffData.data.getTheStaff;
        if (staff.profileStatus === 'Incomplete') {
          navigation.navigate('CompeleteProfile');
        } else {
          //navigation.navigate('CompeleteProfile');

         setIsUserAuth(true);
        }
        console.log(userId);
      } catch (error) {
        console.log('sdd');
      }
      // navigation.navigate('CompeleteProfile');
    } catch (error) {
      console.log('Error signing in:', error);
      await signOut();
      setIsError(true);
      const message = error.toString().split(':').pop().trim();
      setErrMsg(message);
      await signOut();
      if (error.message.includes('There is already a signed-in user')) {
        setErrMsg('There is already a signed-in user. Please sign out first.');
    await signOut();
      } else {
        await signOut();
        const message = error.toString().split(':').pop().trim();
        setErrMsg(message || 'Error signing in. Please try again.');
        await signOut();
      }
    }
  }
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

      console.log('staff...s', staff.id);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };
  async function handleSignOut() {
    try {
      await signOut();
      // navigation.navigate("Welcome");
    } catch (error) {
      console.log('error signing out: ', error);
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
            source={require('../assets/logo.png')}
            style={styles.imageStyle}
          />
          <Formik
            initialValues={{
              email: 'tes7e',
              password: 'WNw8RKImGF',
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
                  <Text
                    fontSize={'$sm'}
                    color={colors.txtColor_bg}
                    style={{padding: 3}}>
                    {'Email'}
                  </Text>

                  <Input
                    h={60}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#C9C9C9"
                    backgroundColor="#cccccc">
                    <InputField
                      onChangeText={text => {
                        handleChange('email')(text);
                      }}
                      onBlur={handleBlur('email')}
                      value={handleChangeSpace(values.email)}
                      placeholder="Email"
                      placeholderTextColor={'#a6a6a6'}
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
                  <Text
                    fontSize={'$sm'}
                    color={colors.txtColor_bg}
                    style={{padding: 3}}>
                    {'Password'}
                  </Text>

                  <Input
                    h={60}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#C9C9C9"
                    backgroundColor="#cccccc">
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
                          color={colors.txtColor_bg}
                        />
                      )}
                    </InputSlot>
                  </Input>
                  {touched.password && errors.password && (
                    <Text color="red">{errors.password}</Text>
                  )}
                </Box>
                <VStack>
                  {/* <TouchableOpacity
                    onPress={() => {
                      //navigation.navigate('ForgetPassword');
                    }}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity> */}

                  <CustomButton
                    marginTop={30}
                    backgroundColor={colors.btnBgColor_secondary}
                    action={() => {
                     // handleSubmit();
                      userSignIn({
                        username2: handleChangeSpace(values.email),
                        password2: handleChangeSpace(values.password),
                      });
                    }}
                    text="Login"
                    textColor={colors.white}
                  />

                  {isError && (
                    <Box style={{alignSelf: 'center', marginTop: 10}}>
                      <Text style={{color: 'red'}}>{errMsg}</Text>
                    </Box>
                  )}
                </VStack>
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
