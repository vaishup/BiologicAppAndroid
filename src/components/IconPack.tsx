import {
  BadgeDollarSign,
  Bell,
  ChevronLeft,
  CircleHelp,
  CircleUserRound,
  KeyRound,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Send,
  Settings,
  ShieldAlert,
  Smartphone,
  UserRound,
  UserRoundCog,
  UsersRound,
  WalletMinimal,
  User2,
  Eye,EyeOff,ChevronDown,Lock,
 HomeIcon
 
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
    // -------------------------------- Header ---------------------------------
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
    CircleUserRound: (
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
    Settings: (
      <Settings
        color={props.color ?? colors.txtColor_bg}
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
    HouseIcon: (
      <HomeIcon
        color={props.color ?? colors.txtColor_bg}
        size={props.size ?? size_sm}
      />
    ),
    userPic: (
      <UserRound
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
    // -------------------------------- Transaction ---------------------------------
    dollarSign: (
      <BadgeDollarSign
        color={props.color ?? 'grey'}
        size={props.size ?? size_sm}
      />
    ),
    // -------------------------------- Profile ---------------------------------
    editProfile: (
      <UserRoundCog
        color={props.color ?? colors.primary}
        size={props.size ?? size_sm}
      />
    ),
    email: (
      <Mail
        color={props.color ?? colors.primary}
        size={props.size ?? size_sm}
      />
    ),
    phone: (
      <Smartphone
        color={props.color ?? colors.primary}
        size={props.size ?? size_sm}
      />
    ),
    //by vaishali 
    userIcon: (
      <User2
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    mail: (
      <Mail
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    lock: (
      <Lock
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    Smartphone: (
      <Smartphone
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    eye: (
      <Eye
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    eyeOff: (
      <EyeOff
        color={props.color !== undefined ? props.color : '#C9C9C9'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),
    arrowDown: (
      <ChevronDown
        color={props.color !== undefined ? props.color : '#3948AA'}
        size={props.size !== undefined ? props.size : 27}
      />
    ),

  };

  return icons[props.type];
};

export default Icon;