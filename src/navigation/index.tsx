import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HOC from '../components/HOC';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
export type NavigationParams = {
  Home: undefined;
  SignUp:undefined;
  Login:undefined;
  ForgetPassword:undefined;
  ResetPassword:undefined;
};

const Stack = createNativeStackNavigator<NavigationParams>();

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
    </NavigationContainer>
  );
};

export default Root;
