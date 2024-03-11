import {View} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const PrivacyPolicy: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        title="Privacy & Policy"
        leftBtn="drawer"
        leftAction={() => {
          console.log('left');
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default PrivacyPolicy;
