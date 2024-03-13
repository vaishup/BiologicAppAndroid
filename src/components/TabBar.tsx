import React from 'react';
import {Dimensions, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {HStack, SafeAreaView, Text, View} from '@gluestack-ui/themed';

import Icon from './IconPack';
import {colors} from '../styles/colors';

const {width, height} = Dimensions.get('window');

const TabBar = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView
      backgroundColor="white"
      borderTopLeftRadius={15}
      borderTopRightRadius={15}>
      <HStack height={60} alignItems="center">
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('TransactionHistory');
          }}>
          <Icon type={'transaction'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            navigation.navigate('HomePage');
          }}>
          <View mr={3}>
            <Icon type={'send'} size={32} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <Icon type={'noti'} />
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sendBtn: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

    width: 65,
    height: 65,
    borderRadius: 100,
    marginTop: -55,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 255, 0.3)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});

export default TabBar;
