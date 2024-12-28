import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Button, Image, Text, HStack} from '@gluestack-ui/themed';
import Icon from './IconPack';

interface HeaderProps {
  title?: string;
  leftBtn?: string;
  leftBtnSize?: number;
  leftAction?: () => void;
  rightBtn?: string;
  rightBtnSize?: number;
  rightAction?: () => void;
  isShowLogo?: boolean;
  height?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftBtn,
  leftBtnSize,
  leftAction,
  rightBtn,
  rightBtnSize,
  rightAction,
  isShowLogo,
  height,
}) => {
  const navigation = useNavigation();
  const h = height ?? 60;
  return (
    <HStack h={h} px={20} alignItems="center" justifyContent="space-between">
      <TouchableOpacity
        style={{width: 30}}
        onPress={
          leftAction
            ? leftAction
            : () => {
                navigation.goBack();
              }
        }>
        <Icon type={leftBtn ? leftBtn : 'backArrow'} color='black'size={leftBtnSize ?? 35} />
      </TouchableOpacity>
      {title && (
        <Text alignSelf="center"  color='black'fontWeight="$semibold" size="xl">
          {title}
        </Text>
      )}
      {isShowLogo && (
        <Image
          alt="BioLogic logo"
          height={h - 15}
          resizeMode="contain"
          source={require('../assets/logo.png')}
        />
      )}

      <TouchableOpacity style={{width: 30}} onPress={rightAction}>
        {rightBtn && <Icon type={rightBtn} size={rightBtnSize ?? 35}  />}
      </TouchableOpacity>
    </HStack>
  );
};

export default Header;
