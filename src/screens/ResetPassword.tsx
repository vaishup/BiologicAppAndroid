import React, {useState} from 'react';

import {
  View,
  Text as TextView,
  Image as ImageView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  
} from 'react-native';
import Icon from '../components/icon/IconPack';
import {AlertCircle} from 'lucide-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  InputIcon,Heading
 
} from '@gluestack-ui/themed';
import {Mail} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const ResetPassword = () => {
  const initialValues = {email: '', password: ''};
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const navigation = useNavigation<ScreenType>();

  const handleSubmit = () => {
    // Handle signup logic here
    console.log('Form values:');
  };
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

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
<Heading color='#005DAA' justifyContent='center' alignSelf='center'>Reset  Password</Heading>

          <VStack space={'xl'} p={30}>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'New Password'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField type={showPassword ? 'text' : 'password'} placeholder='New Password' />
                <InputSlot pr="$3" onPress={handleState}>
                  <Icon
                    type={showPassword ? 'eye' : 'eyeOff'}
                    color={'#C9C9C9'}
                  />
                </InputSlot>
              </Input>
            </Box>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'Confirm Password'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' />
                <InputSlot pr="$3" onPress={handleState}>
                  <Icon
                    type={showPassword ? 'eye' : 'eyeOff'}
                    color={'#C9C9C9'}
                  />
                </InputSlot>
              </Input>
            </Box>
          </VStack>
          <VStack space={'xl'} p={30}>
            
          </VStack>
          <Box style={styles.container}>
            <VStack p={10}>
             
              <TouchableOpacity
                disabled={isLoading}
                style={styles.loginButton}
                onPress={handleSubmit}>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <Text style={styles.btnText}>Reset Password</Text>
                )}
              </TouchableOpacity>
            </VStack>          
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
