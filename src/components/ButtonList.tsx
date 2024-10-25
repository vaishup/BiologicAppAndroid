import {Dimensions, TouchableOpacity} from 'react-native';
import {HStack, Text, VStack} from '@gluestack-ui/themed';
import Icon from './IconPack';
import {StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

// Usage - You can customize the style of each button or use the default value.
// const list = [
//   {
//     icon: '',
//     name: '',
//     path: '',
//     showArrow: true / false,
//     backgroundColor: '',
//     textColor: '',
//     leftIconColor: '',
//     rightIconColor: '',
//   },
// ];

interface CustomButtonProps {
  borderRadius?: number;
  textColor?: string;
  backgroundColor?: string;
  showArrow?: boolean;
  list: any;
  height?: any;
}

const ButtonList = ({
  borderRadius,
  textColor,
  backgroundColor,
  showArrow,
  list,
  height,
}: CustomButtonProps) => {
  return (
    <>
      {list.map((item: any, index: any) => (
        <TouchableOpacity
          key={index}
          onPress={item.action}
          style={customStyles.shadowContainer}>
          <HStack
            style={{
              backgroundColor:
                backgroundColor || item.backgroundColor || '#fff',
              borderRadius: borderRadius || 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 15,
              height: height || 70,
            }}>
            <HStack style={{alignItems: 'center', gap: 15, flex: 1}}>
              {item.icon && (
                <Icon
                  type={item.icon}
                  color={item.leftIconColor || '#000'}
                  size={35}
                />
              )}
              <VStack gap={5} style={{flex: 1}}>
                <Text
                  fontSize="$lg"
                  fontWeight="$semibold"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  color={textColor || item.textColor || '#5A5A5A'}
                  style={{flexShrink: 1}}>
                  {item.name}
                </Text>
              </VStack>
            </HStack>
            {(showArrow || item.showArrow) && (
              <Icon type="arrowRight" color={item.rightIconColor || '#000'} />
            )}
          </HStack>
        </TouchableOpacity>
      ))}
    </>
  );
};
const customStyles = StyleSheet.create({
    shadowContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      margin: 2,
      shadowColor: '#000', // Color of the shadow
      shadowOffset: {width: 0, height: 4}, // Direction and distance of the shadow
      shadowOpacity: 0.15, // Opacity of the shadow
      shadowRadius: 2, // Blur radius of the shadow, making it larger and softer
      elevation: 2,
    },
  });
export default ButtonList;