import {View, Text} from '@gluestack-ui/themed';
import Header from '../components/Header';

interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Header
        isShowLogo
        leftBtn="drawer"
        leftAction={() => {
          navigation.openDrawer();
        }}
        rightBtn="user"
        rightAction={() => {
          navigation.navigate('Profile');
        }}
      />
      <Text>Home Page</Text>
    </View>
  );
};

export default Home;
