import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DrawerContent from '../components/DrawerContent';
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
            borderTopRightRadius: 15,
          },
        }}
        drawerContent={DrawerContent}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabNavigator} />
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
