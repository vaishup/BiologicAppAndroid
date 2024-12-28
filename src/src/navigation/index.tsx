import {useState, createContext, useContext, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../styles/colors';
import GlobalModal, {useModal} from '../components/Modal/GlobalModal';
import NavBar from '../components/NavBar';
import Welcome from '../screens/Welcome';
import CompeleteProfile from '../screens/CompeleteProfile';
import SignIn from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import BioMatrics from '../screens/BioMatrics';
import ViewProfile from '../screens/ViewProfile';
import ShiftTimer from '../screens/ShiftTimer';
import TabBar from '../components/TabBar'; // assuming you have a custom TabBar component
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import Settings from '../screens/Settings';
import ShiftList from '../screens/ShiftList';
import ViewID from '../screens/ViewID';

// import SignUp from '../screens/SignUp';
// import ForgotPassword from '../screens/ForgotPassword';
// import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isUserAuth: boolean;
  setIsUserAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAuthState = false;
const AuthContext = createContext<AuthContextProps>({
  isUserAuth: initialAuthState,
  setIsUserAuth: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
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
  const {isUserAuth} = useAuth();
  const {isModalVisible} = useModal();

  return (
    <NavigationContainer>
      <KeyboardAwareScrollView
        bounces={false}
        style={{flex: 1, backgroundColor: colors.bgColor}}
        contentContainerStyle={{flexGrow: 1, backgroundColor: colors.bgColor}}
        keyboardShouldPersistTaps="handled">
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!isUserAuth ? (
            <Stack.Group key={'Auth'}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen
                name="CompeleteProfile"
                component={CompeleteProfile}
              />

              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="BioMatrics" component={BioMatrics} />
            </Stack.Group>
          ) : (
            <Stack.Group key={'AfterAuth'}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ShiftList" component={ShiftList} />
              <Stack.Screen name="ViewProfile" component={ViewProfile} />
              <Stack.Screen name="ShiftTimer" component={ShiftTimer} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="ViewID" component={ViewID} />

              <Stack.Screen name="TabNav" component={TabNavigator} />
            </Stack.Group>
          )}
        </Stack.Navigator>
        {isModalVisible && <GlobalModal />}
      </KeyboardAwareScrollView>
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
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ShiftList" component={ShiftList} />
      <Tab.Screen name="ViewProfile" component={ViewProfile} />
      <Tab.Screen name="ShiftTimer" component={ShiftTimer} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
      <Tab.Screen name="ResetPassword" component={ResetPassword} />
      <Tab.Screen name="Settings" component={Settings} />

      {/* <Tab.Screen name="Listing" component={Listing} /> */}
      {/* <Tab.Screen name="Login" component={Login} /> */}
    </Tab.Navigator>
  );
};

export default Root;
