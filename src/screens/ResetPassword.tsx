import {
  Dimensions,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../components/Header';
import {Text, VStack, ScrollView} from '@gluestack-ui/themed';
import Icon from '../components/IconPack';
import Button from '../components/Button';
import {useState} from 'react';
import {Formik} from 'formik';
import CustomTextField from '../components/TextField';
import * as Yup from 'yup';
import {signOut} from '@aws-amplify/auth';
import {useAuth} from '../navigation';

import {updatePassword, type UpdatePasswordInput} from 'aws-amplify/auth';

const {width, height} = Dimensions.get('window');

const ResetPassword = ({navigation}: {navigation: any}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {setIsUserAuth} = useAuth();

  const handleSignOut = async () => {
    try {
      console.log('handleSignOut called');
      await signOut();
      setIsUserAuth(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const passPass =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .matches(
        passPass,
        'Password should be alphanumeric (a-z, A-Z, 0-9) and at least one special characters',
      )
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  async function handleUpdatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordInput) {
    try {
      const updatepawd = await updatePassword({oldPassword, newPassword});
      handleSignOut();

      // navigation.navigate('SuccessError', {
      //   success: true,
      //   title: 'Success',
      //   btnText: 'Back To Login',
      //   path: 'SignIn',
      //   message: 'Your password has been reset successfully',
      // });
    } catch (err) {
      console.log(err);
      console.log('erorr----', err);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#307CC3'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <VStack
          style={{
            flex: 1,
            justifyContent: 'space-between',
            height: height,
          }}>
          <VStack>
            <Header title="Reset Password" isBack={false} />
          </VStack>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={schema}
            onSubmit={values =>
              handleUpdatePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
              })
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <VStack
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    paddingVertical: 30,
                  }}>
                  <ScrollView bounces={false}>
                    <VStack style={{alignItems: 'center'}} space="3xl">
                      <Icon type="dotPassword" size={100} />
                      <VStack
                        style={{alignItems: 'center'}}
                        space="lg"
                        maxWidth={'90%'}>
                        <Text
                          alignSelf="center"
                          color="black"
                          fontWeight="$semibold"
                          size="xl">
                          Set your new password
                        </Text>
                      </VStack>
                      <VStack
                        space="lg"
                        style={{
                          flex: 1,
                          width: width,
                          marginVertical: 20,
                          paddingHorizontal: 25,
                        }}>
                        <CustomTextField
                          type={showPassword ? 'text' : 'password'}
                          iconRight={showPassword ? 'eyeOff' : 'eye'}
                          action={() => setShowPassword(!showPassword)}
                          onChangeText={handleChange('oldPassword')}
                          onBlur={handleBlur('oldPassword')}
                          error={touched.oldPassword && errors.oldPassword}
                          value={values.oldPassword}
                          title="Old Password"
                          icon="lock"
                          placeholder=""
                          maxLength={30}
                        />
                        <CustomTextField
                          type={showPassword ? 'text' : 'password'}
                          iconRight={showPassword ? 'eyeOff' : 'eye'}
                          action={() => setShowPassword(!showPassword)}
                          onChangeText={handleChange('newPassword')}
                          onBlur={handleBlur('newPassword')}
                          error={touched.newPassword && errors.newPassword}
                          value={values.newPassword}
                          title="New Password"
                          icon="lock"
                          placeholder=""
                          maxLength={30}
                        />
                        <CustomTextField
                          type={showConfirmPassword ? 'text' : 'password'}
                          iconRight={showConfirmPassword ? 'eyeOff' : 'eye'}
                          action={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          error={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          value={values.confirmPassword}
                          title="Confirm New Password"
                          icon="lock"
                          placeholder=""
                          maxLength={30}
                        />
                      </VStack>
                    </VStack>
                  </ScrollView>
                </VStack>
                <VStack style={{paddingVertical: 10, padding: 20}}>
                  <Button text="Submit" action={handleSubmit} />
                </VStack>
              </>
            )}
          </Formik>
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
