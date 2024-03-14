import {useState, createContext, useContext} from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DrawerContent from '../components/DrawerContent';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import OTP from '../screens/OTP';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import TabBar from '../components/TabBar';
import HOC from '../components/HOC';

import Home from '../screens/Home';
import TransactionHistory from '../screens/TransactionHistory';
import Notification from '../screens/Notification';

import Profile from '../screens/Profile';
import SavedRecipients from '../screens/SavedRecipents';
import ChangePassword from '../screens/ChangePassword';
import HelpCenter from '../screens/HelpCenter';
import AboutUs from '../screens/AboutUs';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Welcome from '../screens/Welcome';

export type NavigationParams = {
  Home: undefined;
  OTP: undefined;
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
interface AuthContextProps {
  isUserAuth: boolean;
  setIsUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAuthState = false;

const AuthContext = createContext<AuthContextProps>({
  isUserAuth: initialAuthState,
  setIsUserAuth: () => {},
});
// @ts-ignore
const AuthProvider: React.FC = ({children}) => {
  const [isUserAuth, setIsUserAuth] = useState<boolean>(initialAuthState);

  const contextValue: AuthContextProps = {
    isUserAuth,
    setIsUserAuth,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export {AuthProvider, useAuth};

const Root = () => {
  const newUser = true;
  //if user is not authenticated, show login/sign up
  const {isUserAuth} = useAuth();

  return (
    <NavigationContainer>
      {!isUserAuth ? (
        <>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {newUser && !isUserAuth ? (
              <Stack.Screen name="Welcome" component={HOC(Welcome)} />
            ) : (
              <></>
            )}

            <Stack.Screen name="SignUp" component={HOC(SignUp)} />
            <Stack.Screen name="OTP" component={HOC(OTP)} />
            <Stack.Screen name="Login" component={HOC(Login)} />
            <Stack.Screen
              name="ForgetPassword"
              component={HOC(ForgetPassword)}
            />
            <Stack.Screen name="ResetPassword" component={HOC(ResetPassword)} />
            <Stack.Screen name="DrawNavigator" component={DrawNavigator} />

          </Stack.Navigator>
        </>
      ) : (
        <Stack.Screen name="DrawNavigator" component={DrawNavigator} />
      )}
    </NavigationContainer>
  );
};

const DrawNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: 15,
        },
      }}
      drawerContent={DrawerContent}
      initialRouteName="Welcome">
      <Drawer.Screen name="Home" component={TabNavigator} />
      {/* <Drawer.Screen name="Profile" component={HOC(Profile)} /> */}
      <Drawer.Screen name="SavedRecipients" component={HOC(SavedRecipients)} />
      <Drawer.Screen name="ChangePassword" component={HOC(ChangePassword)} />
      <Drawer.Screen name="HelpCenter" component={HOC(HelpCenter)} />
      <Drawer.Screen name="AboutUs" component={HOC(AboutUs)} />
      <Drawer.Screen name="PrivacyPolicy" component={HOC(PrivacyPolicy)} />
    </Drawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName="HomeStack">
      <Tab.Screen
        name="TransactionHistory"
        component={HOC(TransactionHistory)}
      />

      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Notification" component={HOC(Notification)} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={HOC(Home)} />
      <Stack.Screen name="Profile" component={HOC(Profile)} />
    </Stack.Navigator>
  );
};

export default Root;
