import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, VStack} from '@gluestack-ui/themed';
import Slider from '../components/Slider/Slider';
import Button from '../components/Button';
import {colors} from '../styles/colors';
import { Text, View} from '@gluestack-ui/themed';
import {fonts_styles} from '../styles/font';
import {useAuth} from '../navigation';

const logo = require('../assets/logo.png');

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const fontSize = 20;
const CompeleteProfile = ({navigation}: any) => {
  const {setIsUserAuth} = useAuth();

  async function handleProfile() {
    //setIsUserAuth(true);
    navigation.navigate("Profile");

  } 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <VStack style={{flex: 1, justifyContent: 'space-between'}}>
        <VStack flex={0.7} width="100%" justifyContent="center">
        <Image
        alignSelf='center'
          alt="xwallet"
          source={logo}
          resizeMode="contain"
          height={250}
          width={250}
        />
       <Text
       alignSelf='center'
       paddingTop={10}
            style={fonts_styles.bold}
            color={colors.txtColor_bg}
            fontSize={fontSize}>
              Complete your profile to start Shift
          </Text>
        </VStack>
        <VStack
          flex={0.3}
          width={width}
          px={20}
          space="md"
          alignSelf="center"
          justifyContent="center">
          <Button
            text="Start"
            backgroundColor={colors.btnBgColor_secondary}
            textColor={colors.white}
            action={handleProfile}
          />
          {/* <Button text="Sign Up" action={() => navigation.navigate('SignUp')} /> */}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
export default CompeleteProfile;