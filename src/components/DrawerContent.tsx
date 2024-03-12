import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Box,
  HStack,
  Image,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import Icon from './IconPack';
import {colors} from '../styles/colors';

const {width, height} = Dimensions.get('window');
const defaultImg = require('../assets/placeholders.png');

const dummyData = {
  username: 'Sherman',
  email: 'sherman@gmail.com',
};

interface DrawerItemData {
  label: string;
  icon: string;
  screen: string;
}

const drawerItems: DrawerItemData[] = [
  {label: 'Saved Recipients', icon: 'users', screen: 'SavedRecipients'},
  {label: 'Change Password', icon: 'key', screen: 'ChangePassword'},
  {label: 'Help Center', icon: 'help', screen: 'HelpCenter'},
  {label: 'About Us', icon: 'info', screen: 'AboutUs'},
  {label: 'Privacy & Policy', icon: 'alert', screen: 'PrivacyPolicy'},
];

const DrawerContent = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState(dummyData);

  return (
    <SafeAreaView backgroundColor={colors.primary}>
      <VStack space="xl" padding={20} height="$full">
        <VStack mb={15} alignItems="center">
          <Box style={styles.icon_container}>
            <Image alt="user icon" source={defaultImg} style={styles.icon} />
          </Box>

          <Text mt={8} color="white" size="2xl" fontWeight="$bold">
            {user.username}
          </Text>
          <Text color="white" size="sm">
            {user.email}
          </Text>
        </VStack>

        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(item.screen);
            }}>
            <HStack height="auto" space="md" alignItems="center">
              <Icon type={item.icon} size={25} />
              <Text color="white">{item.label}</Text>
            </HStack>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => console.log('Sign Out')}>
          <HStack height="auto" space="md" alignItems="center">
            <Icon type={'signOut'} size={25} />
            <Text color="white">Sign Out</Text>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: width / 4,
    height: width / 4,
    borderRadius: width,
  },
  icon_container: {
    width: width / 3.5,
    height: width / 3.5,
    borderRadius: width,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 10,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerContent;
