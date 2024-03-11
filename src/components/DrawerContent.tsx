import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  useNavigationState,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {HStack, Text, View} from '@gluestack-ui/themed';

import Icon from './IconPack';
import {colors} from '../styles/colors';

interface DrawerItemData {
  label: string;
  icon: string;
  screen: string;
}

const drawerItems: DrawerItemData[] = [
  {label: 'Home', icon: 'user', screen: 'Home'},
  // {label: 'Saved Recipients', icon: 'user', screen: 'Home'},
  {label: 'Change Password', icon: 'user', screen: 'ChangePassword'},
  {label: 'Help Center', icon: 'user', screen: 'HelpCenter'},
  {label: 'About Us', icon: 'user', screen: 'AboutUs'},
  {label: 'Privacy & Policy', icon: 'user', screen: 'PrivacyPolicy'},
];

const DrawerContent = (props: any) => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const isFocused = useIsFocused();

  return (
    // <View
    //   height="$full"
    //   backgroundColor={colors.primary}
    //   padding={20}
    //   borderTopRightRadius={30}
    //   borderBottomRightRadius={30}>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* {drawerItems.map((item, index) => (
        <DrawerItem
          key={index}
          label={item.label}
          icon={() => <Icon type={item.icon} />} // Add your icon component here
          // focused={
          //   navigationState?.routes[navigationState?.index]?.name ===
          //   item.screen
          // }
          onPress={() => {
            navigation.navigate(item.screen);
          }}
        />
      ))} */}
    </DrawerContentScrollView>

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DrawerContent;
