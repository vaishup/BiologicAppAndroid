import {HStack, Text, VStack, View} from '@gluestack-ui/themed';
import Header from '../components/Header';
import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../styles/colors';

const {width} = Dimensions.get('window');

const Notification = ({navigation}: {navigation: any}) => {
  const NotiBox = () => {
    return (
      <View style={{width: width, alignItems: 'center'}}>
        <HStack style={styles.notiBox} space="lg">
          <VStack style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: colors.primary}}>13</Text>
            <Text>MAR</Text>
          </VStack>
          <View style={{borderColor: colors.primary, borderWidth: 1}}></View>
          <VStack></VStack>
        </HStack>
      </View>
    );
  };

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
      <VStack style={{paddingVertical: 10}}>
        <NotiBox />
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  notiBox: {
    backgroundColor: 'white',
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
  },
});

export default Notification;
