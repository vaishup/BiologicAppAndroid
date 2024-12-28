import {StyleSheet, Platform} from 'react-native';

export const fonts_styles = StyleSheet.create({
  light: {
    ...Platform.select({
      ios: {
        fontFamily: 'Jura-Light',
        fontWeight: '300',
      },
      android: {
        fontFamily: 'Jura-Light',
      },
    }),
  },
  regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'Jura-Regular',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'Jura-Regular',
      },
    }),
  },
  medium: {
    ...Platform.select({
      ios: {
        fontFamily: 'Jura-Medium',
        fontWeight: '500',
      },
      android: {
        fontFamily: 'Jura-Medium',
      },
    }),
  },
  semiBold: {
    ...Platform.select({
      ios: {
        fontFamily: 'Jura-SemiBold',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'Jura-SemiBold',
      },
    }),
  },
  bold: {
    ...Platform.select({
      ios: {
        fontFamily: 'Jura-Bold',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'Jura-Bold',
      },
    }),
  },
});