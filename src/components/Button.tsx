import {
  DimensionValue,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../styles/colors';

const {width} = Dimensions.get('window');
const windowWidth = width;

interface CustomButtonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  text?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  action?: () => void;
}

const CustomButton = ({
  width,
  height,
  text,
  backgroundColor,
  style,
  borderWidth,
  borderColor,
  textColor,
  action,
}: CustomButtonProps) => {
  return (
    <View style={{width: width, alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          width: width !== undefined ? width : windowWidth * 0.9,
          height: height !== undefined ? height : 50,
          borderRadius: 10,
          borderWidth: borderWidth !== undefined ? borderWidth : 0,
          borderColor: borderColor !== undefined ? borderColor : 'transparent',
          backgroundColor:
            backgroundColor !== undefined ? backgroundColor : colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        onPress={action}>
        <Text
          style={{
            color: textColor !== undefined ? textColor : 'white',
            fontWeight: '600',
            fontSize: 16,
          }}>
          {text !== undefined ? text : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
