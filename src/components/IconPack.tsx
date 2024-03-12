import {
  Bell,
  ChevronLeft,
  CircleHelp,
  CircleUserRound,
  KeyRound,
  Info,
  LayoutDashboard,
  LogOut,
  Send,
  ShieldAlert,
  UsersRound,
  WalletMinimal,
} from 'lucide-react-native';
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
  const size_sm = '27';

  let icons: Dictionary<any> = {
    backArrow: (
      <ChevronLeft
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
    user: (
      <CircleUserRound
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
    // -------------------------------- NavBar ---------------------------------
    transaction: (
      <WalletMinimal
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
    send: <Send color={props.color ?? 'white'} size={props.size ?? size_sm} />,
    noti: (
      <Bell
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
    // -------------------------------- Drawer ---------------------------------
    drawer: (
      <LayoutDashboard
        color={props.color ?? colors.secondary}
        size={props.size ?? size_sm}
      />
    ),
    users: (
      <UsersRound color={props.color ?? 'white'} size={props.size ?? size_sm} />
    ),
    key: (
      <KeyRound color={props.color ?? 'white'} size={props.size ?? size_sm} />
    ),
    help: (
      <CircleHelp color={props.color ?? 'white'} size={props.size ?? size_sm} />
    ),
    info: <Info color={props.color ?? 'white'} size={props.size ?? size_sm} />,
    alert: (
      <ShieldAlert
        color={props.color ?? 'white'}
        size={props.size ?? size_sm}
      />
    ),
    signOut: (
      <LogOut color={props.color ?? 'white'} size={props.size ?? size_sm} />
    ),
  };

  return icons[props.type];
};

export default Icon;
