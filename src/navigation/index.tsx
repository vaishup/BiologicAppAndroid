import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HOC from '../components/HOC';
import DrawerContent from '../components/DrawerContent';
import Home from '../screens/Home';

import AboutUs from '../screens/AboutUs';
import ChangePassword from '../screens/ChangePassword';
import HelpCenter from '../screens/HelpCenter';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Profile from '../screens/Profile';
import {colors} from '../styles/colors';
import Icon from '../components/IconPack';

export type NavigationParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colors.primary,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        }}
        drawerContent={DrawerContent}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => <Icon type={'user'} />,
          }}
        />
        {/* <Drawer.Screen name="Profile" component={HOC(Profile)} /> */}

        <Drawer.Screen
          name="ChangePassword"
          component={HOC(ChangePassword)}
          options={{
            drawerLabel: 'Change Password',
            drawerIcon: () => <Icon type={'user'} />,
          }}
        />
        <Drawer.Screen
          name="HelpCenter"
          component={HOC(HelpCenter)}
          options={{
            drawerLabel: 'Help Center',
            drawerIcon: () => <Icon type={'user'} />,
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={HOC(AboutUs)}
          options={{
            drawerLabel: 'About Us',
            drawerIcon: () => <Icon type={'user'} />,
          }}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={HOC(PrivacyPolicy)}
          options={{
            drawerLabel: 'Privacy & Policy',
            drawerIcon: () => <Icon type={'user'} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HOC(Home)} />
      <Stack.Screen name="Profile" component={HOC(Profile)} />
    </Stack.Navigator>
  );
};

export default Root;
