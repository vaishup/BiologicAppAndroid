import {Text, View} from '@gluestack-ui/themed';
import Header from '../components/Header';
import Calculator from '../components/Calculator';

const Home = ({navigation}: {navigation: any}) => {
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
      <View padding={20}>
        <Calculator
          onPress={() => {
            console.log('From Home Page');
          }}
        />
      </View>
    </View>
  );
};

export default Home;
