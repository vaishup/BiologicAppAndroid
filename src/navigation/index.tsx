import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HOC from '../components/HOC';
import Home from '../screens/Home';

export type NavigationParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<NavigationParams>();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HOC(Home)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
