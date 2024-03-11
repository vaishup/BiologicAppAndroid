import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Button, Image, Text, HStack} from '@gluestack-ui/themed';
import Icon from './IconPack';

interface HeaderProps {
  title?: string;
  leftBtn?: string;
  leftAction?: () => void;
  rightBtn?: string;
  rightAction?: () => void;
  isShowLogo?: boolean;
  height?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftBtn,
  leftAction,
  rightBtn,
  rightAction,
  isShowLogo,
  height,
}) => {
  const navigation = useNavigation();
  const h = height ?? 60;
  return (
    <HStack h={h} p={20} alignItems="center" justifyContent="space-between">
      <TouchableOpacity
        style={{width: 30}}
        onPress={
          leftAction
            ? leftAction
            : () => {
                navigation.goBack();
              }
        }>
        <Icon type={leftBtn ? leftBtn : 'backArrow'} />
      </TouchableOpacity>
      {title && <Text alignSelf="center">{title}</Text>}
      {isShowLogo && (
        <Image
          height={h - 15}
          resizeMode="contain"
          source={require('../assets/logo.png')}
        />
      )}

      <TouchableOpacity style={{width: 30}} onPress={rightAction}>
        {rightBtn && <Icon type={rightBtn} />}
      </TouchableOpacity>
    </HStack>
  );
};

export default Header;
