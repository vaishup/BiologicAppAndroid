import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Box,
  HStack,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import Icon from './IconPack';
import {colors} from '../styles/colors';

const dummyData = {
  username: 'Sherman',
  email: 'sherman@gmail.com',
  profileUri: '',
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
      <ScrollView height="$full">
        <VStack space="xl" padding={20}>
          <VStack mb={15} alignItems="center">
            <Box style={styles.icon_container}>
              {user.profileUri ? (
                <Image
                  alt="User Profile"
                  source={{uri: user.profileUri}}
                  style={styles.icon}
                />
              ) : (
                <Icon type={'userPic'} size={110} />
              )}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 135,
    height: 135,
    borderRadius: 150,
  },
  icon_container: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 10,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerContent;
