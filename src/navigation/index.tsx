import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HOC from '../components/HOC';
import DrawerContent from '../components/DrawerContent';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';

import SavedRecipients from '../screens/SavedRecipents';
import AboutUs from '../screens/AboutUs';
import ChangePassword from '../screens/ChangePassword';
import HelpCenter from '../screens/HelpCenter';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Profile from '../screens/Profile';

export type NavigationParams = {
  Home: undefined;
  SignUp:undefined;
  Login:undefined;
  ForgetPassword:undefined;
  ResetPassword:undefined;
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={HOC(SignUp)} />

      <Stack.Screen name="ResetPassword" component={HOC(ResetPassword)} />
      <Stack.Screen name="ForgetPassword" component={HOC(ForgetPassword)} />
     
      <Stack.Screen name="Login" component={HOC(Login)} />

        <Stack.Screen name="Home" component={HOC(Home)} />
      </Stack.Navigator>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        }}
        drawerContent={DrawerContent}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        {/* <Drawer.Screen name="Profile" component={HOC(Profile)} /> */}
        <Drawer.Screen
          name="SavedRecipients"
          component={HOC(SavedRecipients)}
        />
        <Drawer.Screen name="ChangePassword" component={HOC(ChangePassword)} />
        <Drawer.Screen name="HelpCenter" component={HOC(HelpCenter)} />
        <Drawer.Screen name="AboutUs" component={HOC(AboutUs)} />
        <Drawer.Screen name="PrivacyPolicy" component={HOC(PrivacyPolicy)} />
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
