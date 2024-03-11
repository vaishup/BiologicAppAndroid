import {View} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const ChangePassword: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        title="Change Password"
        leftBtn="drawer"
        leftAction={() => {
          console.log('left');
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default ChangePassword;
