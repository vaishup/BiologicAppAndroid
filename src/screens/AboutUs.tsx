import {View} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const AboutUs: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        title="About Us"
        leftBtn="drawer"
        leftAction={() => {
          console.log('left');
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default AboutUs;
