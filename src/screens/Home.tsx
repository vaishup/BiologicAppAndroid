import {View, Text} from '@gluestack-ui/themed';
import Header from '../components/Header';

const Home = () => {
  return (
    <View>
      <Header
        isShowLogo
        leftBtn="drawer"
        leftAction={() => {
          console.log('left');
        }}
        rightBtn="user"
        rightAction={() => {
          console.log('right');
        }}
      />
      <Text>Home Page</Text>
    </View>
  );
};

export default Home;
