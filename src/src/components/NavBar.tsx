import React, {useEffect} from 'react';
import {Dimensions, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {HStack, SafeAreaView, Text, View} from '@gluestack-ui/themed';
import Icon from './IconPack';
import {colors} from '../styles/colors';
import {useAuth} from '../navigation';
import {fonts_styles} from '../styles/font';

const {width, height} = Dimensions.get('window');

const NavBar = ({navigation, state}: any) => {
  const iconGap = 5;
  const iconSize = 25;
  const fontSize = 14;
  const getTextStyle = (routeName: any) => {
    const isCurrentRoute = state.routeNames[state.index] === routeName;
    return isCurrentRoute ? fonts_styles.bold : fonts_styles.light;
  };

  return (
    <SafeAreaView backgroundColor="#1E1E1E">
      <HStack height={60} alignItems="center">
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', gap: iconGap}}
          onPress={() => {
            if (state.routeNames[state.index] !== 'Home') {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }
          }}>
          <Icon type={'House'} size={iconSize} />
          <Text
            style={getTextStyle('Home')}
            color={colors.txtColor_bg}
            fontSize={fontSize}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', gap: iconGap}}
          onPress={() => {}}>
          <Icon type={'Coins'} size={iconSize} />
          <Text
            style={fonts_styles.light}
            color={colors.txtColor_bg}
            fontSize={fontSize}>
            Buy / Sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', gap: iconGap}}
          onPress={() => {}}>
          <Icon type={'ArrowRightLeft'} size={iconSize} />
          <Text
            style={getTextStyle('Trade')}
            color={colors.txtColor_bg}
            fontSize={fontSize}>
            Trade
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', gap: iconGap}}
          onPress={() => {
            navigation.navigate('ConnectStack');
            // setModalState(true, 'CompleteProfile');
          }}>
          <Icon type={'Handshake'} size={iconSize} />
          <Text
            style={getTextStyle('ConnectStack')}
            color={colors.txtColor_bg}
            fontSize={fontSize}>
            Connect
          </Text>
        </TouchableOpacity>
      </HStack>
    </SafeAreaView>
  );
};

export default NavBar;