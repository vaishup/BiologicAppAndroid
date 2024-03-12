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
import {Mail, Check, AlertCircle, Lock, User2} from 'lucide-react-native';
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
  InputIcon,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneNumberInput from '../components/PhoneNumberInput';

const {width, height} = Dimensions.get('window');

const SignUp = () => {
  const initialValues = {email: '', password: ''};
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [enableCheckbox, setEnableCheckbox] = useState(false);

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
      <SafeAreaView style={{flex: 1}}>
        <Box>
          <ImageView
            alt="Logo Styles"
            source={require('../assets/logo.png')}
            style={styles.imageStyle}
          />
          <VStack space={'xl'}  p={30}>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'First Name'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField placeholder="First Name" />
                <InputSlot pr="$3">
                  <Icon type="user" color={'#C9C9C9'} />
                </InputSlot>
              </Input>
            </Box>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'Last Name'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField placeholder="Last Name" />
                <InputSlot pr="$3">
                  <Icon type="user" color={'#C9C9C9'} />
                </InputSlot>
              </Input>
            </Box>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'Email'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField placeholder="Email" />
                <InputSlot pr="$3">
                <Mail color={'#C9C9C9'} size={27} />
                </InputSlot>
              </Input>
            </Box>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'Phone Number'}
              </Text>
              <PhoneNumberInput/>
              {/* <Input style={{borderRadius: 10, height: 45}}>
                <InputField placeholder="Phone Number" keyboardType='numeric'/>
                <InputSlot pr="$3">
                  <Icon type="phoneNo" color={'#C9C9C9'} />
                </InputSlot>
              </Input> */}
            </Box>
            <Box style={[styles.container]}>
              <Text fontSize={'$sm'} color="#005DAA" style={{padding: 3}}>
                {'Password'}
              </Text>
              <Input style={{borderRadius: 10, height: 45}}>
                <InputField type={showPassword ? 'text' : 'password'} placeholder='Password' />
                <InputSlot pr="$3" onPress={handleState}>
                  <Icon
                    type={showPassword ? 'eye' : 'eyeOff'}
                    color={'#C9C9C9'}
                  />
                </InputSlot>
              </Input>
            </Box>
            <Checkbox
              value="Eng"
              aria-label="Close"
              size="sm"  
              // isChecked={field.value}
              >
              <CheckboxIndicator borderColor="#C9C9C9" mr="$2">
                <CheckboxIcon as={Check} backgroundColor="#008000" />
              </CheckboxIndicator>
              <CheckboxLabel style={{color: '#005DAA', fontSize: 14}}>
                Accept our Terms & Conditions to continue
              </CheckboxLabel>
            </Checkbox>
       
            <VStack p={10}>
              
              <TouchableOpacity
                disabled={isLoading}
                style={styles.loginButton}
                onPress={handleSubmit}>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <Text style={styles.btnText}>SingUp</Text>
                )}
              </TouchableOpacity>
            </VStack>
            </VStack>
            <Box style={styles.signupContainer}>
              <TouchableOpacity>
                <Text style={styles.signupText}>
                  Already have an account?{' '}
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
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotPassword: {
    color: '#005DAA',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingBottom:10,
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

export default SignUp;
