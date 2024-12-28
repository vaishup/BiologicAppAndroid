import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AlertCircle, } from 'lucide-react-native'; // Replace with your icon library

const CustomPasswordField = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  placeholderTextColor,
  error,
  touched,
  showPassword, // Boolean state for showing/hiding password
  togglePasswordVisibility, // Function to toggle password visibility
}) => {
  return (
    <View style={{ 
      backgroundColor: '#fff', 
      borderColor: '#C9C9C9', 
      borderWidth: 1, 
      borderRadius: 8, 
      flexDirection: 'row', 
      alignItems: 'center' 
    }}>
      {/* Password Input */}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={!showPassword} // Toggle between text and password
        style={{
          padding: 10,
          flex: 1,
          color: '#000',
        }}
        placeholderTextColor={placeholderTextColor}
      />

      {/* Icon Slot for Eye and Error Icon */}
      <TouchableOpacity onPress={togglePasswordVisibility} style={{ paddingRight: 10 }}>
        {touched && error ? (
          <AlertCircle color={'red'} size={27} />
        ) : (
          <Icon
            type={showPassword ? 'eye' : 'eyeOff'} // Toggle between eye and eyeOff
            color={'#C9C9C9'}
            size={27}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomPasswordField;
