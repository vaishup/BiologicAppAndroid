import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VStack} from '@gluestack-ui/themed';
import Slider from '../components/Slider/Slider';
import Button from '../components/Button';
import {colors} from '../styles/colors';
import {signOut} from 'aws-amplify/auth';

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
async function handleSignOut() {
  try {
    await signOut();
   // navigation.navigate("Welcome");
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


const Welcome = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <VStack style={{flex: 1, justifyContent: 'space-between'}}>
        <VStack flex={0.7} width="100%" justifyContent="center">
          <Slider />
        </VStack>
        <VStack
          flex={0.3}
          width={width}
          px={20}
          space="md"
          alignSelf="center"
          justifyContent="center">
          <Button
            text="Sign In"
            backgroundColor={colors.btnBgColor_secondary}
            textColor={colors.white}
            action={() => navigation.navigate('SignIn')
        
          }
          />
          {/* <Button text="Sign Up" action={() => navigation.navigate('SignUp')} /> */}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
export default Welcome;