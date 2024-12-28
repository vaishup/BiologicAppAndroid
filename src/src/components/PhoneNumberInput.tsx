import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  VStack,
  Box,
  Input,
  InputField,
  Text,
  InputSlot,
  InputIcon,
  HStack,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from '../components/icon/IconPack';
const {width, height} = Dimensions.get('window');

const PhoneNumberInput = () => {
  const [selectedPhoneCode, setSelectedPhoneCode] = useState('+234'); // Default selected phone code

  return (
    //   <KeyboardAwareScrollView
    //     style={{ flex: 1 }}
    //     contentContainerStyle={{ flexGrow: 1 }}
    //     keyboardShouldPersistTaps="handled"
    //   >
    <HStack space="sm">
      <Select
        style={{
          width: '33%',
         
          borderRadius: 10,
          backgroundColor: '#f2f2f2',
          borderColor: '#cccccc',
        }}
        selectedValue={selectedPhoneCode}
        onValueChange={itemValue => setSelectedPhoneCode(itemValue)}>
       
        <SelectTrigger variant="outline" size="md">
          <SelectInput />
          <SelectIcon style={{ backgroundColor: 'transparent',
                      marginRight:5,
                      padding: 8,}}>
            <Icons as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem  label="+234" value="+234" />
            <SelectItem label="+1" value="+1" />
          </SelectContent>
        </SelectPortal>
      </Select>
      <Input style={{borderRadius: 5, width: '66%', height: 42}}>
        <InputField placeholder=" Phone Number" keyboardType="numeric" />
      </Input>
    </HStack>
    //   </KeyboardAwareScrollView>
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
export default PhoneNumberInput;
