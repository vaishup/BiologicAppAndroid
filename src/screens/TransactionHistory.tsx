import {Text, View} from '@gluestack-ui/themed';
import Header from '../components/Header';

const TransactionHistory = ({navigation}: {navigation: any}) => {
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
      <Text>Transactions</Text>
    </View>
  );
};

export default TransactionHistory;
