import {View} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const HelpCenter: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        title="Help Center"
        leftBtn="drawer"
        leftAction={() => {
          console.log('left');
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default HelpCenter;
