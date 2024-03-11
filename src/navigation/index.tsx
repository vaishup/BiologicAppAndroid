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

export type NavigationParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<NavigationParams>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={DrawerContent}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        {/* <Drawer.Screen name="Profile" component={HOC(Profile)} /> */}
        <Drawer.Screen name="About Us" component={HOC(AboutUs)} />
        <Drawer.Screen name="Change Password" component={HOC(ChangePassword)} />
        <Drawer.Screen name="Help Center" component={HOC(HelpCenter)} />
        <Drawer.Screen name="Privacy Policy" component={HOC(PrivacyPolicy)} />
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
