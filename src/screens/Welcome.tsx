import {
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import Slider from '../components/Slider/Slider';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';
import {Dimensions, TouchableOpacity} from 'react-native';
import navigation from '../navigation';

const {width, height} = Dimensions.get('window');

const Welcome = ({navigation}: {navigation: any}) => {
  return (
    <VStack>
      <VStack>
        <Slider />
      </VStack>
      <VStack space="md">
        <CustomButton
          backgroundColor={colors.secondary}
          text="Track Your Transaction"
          textColor={colors.primary}
        />
        <CustomButton
          backgroundColor={colors.secondary}
          text="Transfer Calculator"
          textColor={colors.primary}
        />
        <CustomButton
          backgroundColor={colors.primary}
          text="Sign In"
          action={() => {
            navigation.navigate('Login');
          }}
        />
        <HStack justifyContent="center" padding={20}>
          <Text>New user? </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SignUp');
          }}>
            <Text style={{color: colors.primary, fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Welcome;
