import {View} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const Profile: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        title="Profile"
        // leftBtn="drawer"
        // leftAction={() => {
        //   navigation.openDrawer();
        // }}
      />
    </View>
  );
};

export default Profile;
