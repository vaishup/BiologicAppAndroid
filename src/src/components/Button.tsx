import React from 'react';
import {DimensionValue, TouchableOpacity, ViewStyle} from 'react-native';
import {View, HStack, Spinner, Text} from '@gluestack-ui/themed';
import Icon from '../components/IconPack';
import {colors} from '../styles/colors';
import {fonts_styles} from '../styles/font';

interface CustomButtonProps {
  width?: DimensionValue;
  maxWidth?: DimensionValue;
  height?: DimensionValue;
  marginTop?: number;
  marginBottom?: number;
  text?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  icon?: string;
  iconColor?: string;
  disable?: boolean;
  loading?: boolean;
  action?: () => void;
  fontWeight?: string;
  fontSize?: number;
  iconSize?: number;
}

const CustomButton = ({
  width,
  maxWidth,
  height,
  marginTop,
  marginBottom,
  text,
  backgroundColor,
  style,
  borderRadius,
  borderWidth,
  borderColor,
  textColor,
  icon,
  iconColor,
  disable,
  loading,
  action,
  fontWeight,
  fontSize,
  iconSize,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={{
        width:
          width !== undefined ? width : text === undefined ? iconSize : '100%',
        maxWidth: maxWidth,
        height:
          height !== undefined ? height : text === undefined ? iconSize : 70,
        marginTop: marginTop !== undefined ? marginTop : 0,
        marginBottom: marginBottom !== undefined ? marginBottom : 0,
        borderRadius: borderRadius !== undefined ? borderRadius : 15,
        borderWidth: borderWidth !== undefined ? borderWidth : 0,
        borderColor: borderColor !== undefined ? borderColor : 'transparent',
        backgroundColor:
          backgroundColor !== undefined
            ? backgroundColor
            : text === undefined
            ? undefined
            : colors.btnBgColor_primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onPress={() => {
        // Add this log to check if button press is being detected
        action && action();
      }}>
      <HStack style={{alignItems: 'center'}} space="sm">
        {loading ? (
          <Spinner
            size="small"
            color={
              textColor !== undefined ? textColor : colors.txtColor_primary
            }
          />
        ) : (
          <>
            {icon && (
              <Icon
                type={icon}
                color={iconColor || textColor || colors.txtColor_primary}
                size={iconSize}
              />
            )}
            {text && (
              <Text
                color={
                  textColor !== undefined
                    ? textColor
                    : disable
                    ? colors.txtColor_disable
                    : colors.txtColor_primary
                }
                style={fonts_styles.semiBold}
                fontSize={fontSize !== undefined ? fontSize : 20}>
                {text !== undefined ? text : 'Button'}
              </Text>
            )}
          </>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default CustomButton;