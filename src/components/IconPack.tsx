import {ChevronLeft, CircleUserRound} from 'lucide-react-native';
import {colors} from '../styles/colors';

interface IconProps {
  type: any;
  color?: string;
  size?: number;
}

interface Dictionary<Type> {
  [key: string]: Type;
}

const Icon = (props: IconProps) => {
  const color_darkGrey = '#333333';
  const size_sm = '27';

  let icons: Dictionary<any> = {
    backArrow: (
      <ChevronLeft
        color={props.color ?? colors.primary}
        size={props.size ?? size_sm}
      />
    ),
    user: (
      <CircleUserRound
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
  };

  return icons[props.type];
};

export default Icon;
