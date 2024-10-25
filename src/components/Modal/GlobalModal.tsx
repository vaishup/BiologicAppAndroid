import React, {ReactNode, createContext, useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {
  Divider,
  HStack,
  Modal,
  ModalBackdrop,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import CustomTextField from '../TextField';
import Icon from '../IconPack';
import {colors} from '../../styles/colors';
import {fonts_styles} from '../../styles/font';

interface ModalContextProps {
  isModalVisible: boolean;
  modalType: string;
  title?: string;
  content?: string;
  btnText?: string;
  leftBtnText?: string;
  rightBtnText?: string;
  action?: () => void;
  setModalState: (
    isVisible: boolean,
    type:
      | 'MessageConfirm'
      | 'DefaultCurrency'
      | 'CompleteProfile'
      | 'CompleteKYC'
      | 'ConfirmDelete'
      | '',
    title?: string,
    content?: string,
    btnText?: string,
    action?: () => void,
  ) => void;
}

const defaultBorderRadius = 20;

const {width: screenW, height: screenH} = Dimensions.get('window');
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;

const GlobalModal = () => {
  const {
    isModalVisible,
    modalType,
    title,
    content,
    btnText,
    leftBtnText,
    rightBtnText,
    setModalState,
    action,
  } = useModal();

  const DefaultCurrency = () => {
    const [isOpenTokenPicker, setIsOpenTokenPicker] = useState(false);
    const [fiatCurrency, setFiatCurrency] = useState('');
    const [error, setError] = useState(false);
    const [checkDeleteText, setDeleteText] = useState('');

    const tokenList = {
      FIAT: ['USD', 'CAD', 'AUD', 'EUR', 'GBP'],
    };

    const confirmDefaultCurrency = () => {
      if (fiatCurrency !== '') {
        console.log('Selected', fiatCurrency);
        // Store the selected fiat in the local storage
        // Function Here
        setModalState(false, '');
      } else {
        setError(true);
      }
    };

    return (
      isModalVisible && (
        <>
          <VStack style={styles.welcomeModalContent}>
            <VStack space="lg" p={20}>
              <Text
                fontSize="$xl"
                textAlign="center"
                style={[fonts_styles.bold, {color: colors.txtColor_bg}]}>
                Welcome to XWallet
              </Text>
              <Text
                fontSize="$sm"
                textAlign="center"
                style={[fonts_styles.light, {color: colors.txtColor_bg}]}>
                Please choose your default currency:
              </Text>
              <CustomTextField
                onPress={() => setIsOpenTokenPicker(true)}
                valueIcon={fiatCurrency}
                value={fiatCurrency}
                placeholder="Select"
                error={error}
                isPicker
                iconRight="ChevronDown"
                height={45}
                backgroundColor={colors.bgColor}
                borderColor={colors.btnBgColor_selected}
              />
            </VStack>
            <VStack width={'100%'}>
              <Divider bgColor={colors.btnBgColor_selected} />
              <TouchableOpacity
                style={[fonts_styles.bold, styles.welcomeModalButton]}
                onPress={confirmDefaultCurrency}>
                <Text color={colors.txtColor_bg}>Confirm</Text>
              </TouchableOpacity>
            </VStack>
          </VStack>
        
        </>
      )
    );
  };

  const ConfirmDelete = () => {
    const [error, setError] = useState('');
    const [confirmDeleteText, setConfirmDeleteText] = useState('');

    async function deleteAccount() {
      try {
        console.log('account deleted!');
      } catch (Err) {
        console.log('error in delete account....');
      }
    }

    return (
      isModalVisible && (
        <>
          <VStack style={styles.welcomeModalContent}>
            <VStack space="lg" p={20}>
              <Text
                fontSize="$xl"
                textAlign="center"
                style={[fonts_styles.bold, {color: colors.txtColor_bg}]}>
                Delete Account
              </Text>
              <VStack>
                <Text
                  fontSize="$sm"
                  textAlign="center"
                  style={[fonts_styles.light, {color: colors.txtColor_bg}]}>
                  Are you sure you want to delete the account?
                </Text>
                <Text
                  fontSize="$sm"
                  style={[fonts_styles.light, {color: colors.txtColor_bg}]}>
                  Type{' '}
                  <Text
                    fontSize="$sm"
                    style={
                      (fonts_styles.bold, {color: colors.txtColor_primary})
                    }>
                    DELETE
                  </Text>{' '}
                  to confirm
                </Text>
              </VStack>

              <CustomTextField
                error={error}
                height={45}
                backgroundColor={colors.bgColor}
                borderColor={colors.btnBgColor_selected}
                onChangeText={e => setConfirmDeleteText(e)}
              />
            </VStack>
            <Divider bgColor={colors.dividerColor} />
            <HStack justifyContent="space-around" width={'100%'} p={20}>
              <TouchableOpacity
                onPress={() => {
                  setModalState(false, '');
                }}>
                <Text
                  style={
                    (fonts_styles.bold,
                    {color: colors.txtColor_primary, fontSize: 18})
                  }>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (confirmDeleteText?.toLowerCase() === 'delete') {
                    deleteAccount();
                    setModalState(false, '');
                  } else {
                    setError('Type DELETE to confirm!');
                  }
                }}>
                <Text style={[fonts_styles.bold, {color: 'red', fontSize: 18}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </>
      )
    );
  };

  const MessageConfirm = () => {
    return (
      isModalVisible && (
        <VStack style={styles.welcomeModalContent}>
          <VStack space="lg" p={20} alignItems="center">
            <Text
              fontSize="$xl"
              style={[fonts_styles.bold, {color: colors.txtColor_bg}]}>
              {title || 'Title'}
            </Text>
            <Text
              fontSize="$sm"
              textAlign="center"
              style={[
                fonts_styles.regular,
                {color: colors.txtColor_bg, paddingVertical: 30},
              ]}>
              {content || 'Text'}
            </Text>
          </VStack>
          <VStack width={'100%'}>
            <Divider bgColor={colors.btnBgColor_selected} />
            <TouchableOpacity
              style={styles.welcomeModalButton}
              onPress={() => {
                action && action();
                setModalState(false, '');
              }}>
              <Text style={fonts_styles.bold} color={colors.txtColor_bg}>
                {btnText || 'Button Text'}
              </Text>
            </TouchableOpacity>
          </VStack>
        </VStack>
      )
    );
  };

  const CompleteProfile = () => {
    return (
      isModalVisible && (
        <VStack style={styles.welcomeModalContent}>
          <VStack space="lg" p={20}>
            <Text
              fontSize="$xl"
              style={[
                fonts_styles.bold,
                {color: colors.txtColor_bg, textAlign: 'center'},
              ]}>
              Complete Your Profile
            </Text>
            <VStack space="lg" paddingHorizontal={20}>
              <Text
                fontSize="$sm"
                style={[fonts_styles.regular, {color: colors.txtColor_bg}]}>
                Please complete your profile to unlock the full features of
                Connect.
              </Text>
              <VStack space="md">
                <HStack style={styles.completeItems}>
                  <Icon type="Smartphone" size={20} />
                  <Text
                    fontSize="$sm"
                    style={[fonts_styles.regular, {color: colors.txtColor_bg}]}>
                    Verify phone number
                  </Text>
                </HStack>
                <HStack style={styles.completeItems}>
                  <Icon type="ImageLucide" size={20} />
                  <Text
                    fontSize="$sm"
                    style={[fonts_styles.regular, {color: colors.txtColor_bg}]}>
                    Upload profile picture
                  </Text>
                </HStack>
                <HStack style={styles.completeItems}>
                  <Icon type="UserRound" size={20} />
                  <Text
                    fontSize="$sm"
                    style={[fonts_styles.regular, {color: colors.txtColor_bg}]}>
                    Edit username
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
          <VStack width={'100%'}>
            <Divider bgColor={colors.btnBgColor_selected} />
            <HStack>
              <TouchableOpacity
                style={styles.detailModalButton}
                onPress={() => {}}>
                <Text style={fonts_styles.bold} color={colors.txtColor_bg}>
                  Go to Profile
                </Text>
              </TouchableOpacity>
              <Divider
                orientation="vertical"
                bgColor={colors.btnBgColor_selected}
              />
              <TouchableOpacity
                style={styles.detailModalButton}
                onPress={() => {
                  setModalState(false, '');
                }}>
                <Text style={fonts_styles.bold} color={colors.txtColor_bg}>
                  Later
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </VStack>
      )
    );
  };

  const CompleteKYC = () => {
    return (
      isModalVisible && (
        <VStack style={styles.welcomeModalContent}>
          <VStack space="2xl" p={20}>
            <Text
              fontSize="$xl"
              style={[
                fonts_styles.bold,
                {color: colors.txtColor_bg, textAlign: 'center'},
              ]}>
              Incomplete Verification
            </Text>
            <VStack space="lg" paddingHorizontal={20} alignItems="center">
              <Icon type="ShieldAlert" size={70} />
              <Text
                fontSize="$sm"
                style={[
                  fonts_styles.regular,
                  {color: colors.txtColor_bg, textAlign: 'center'},
                ]}>
                Please complete identity verification to unlock full features of
                XWallet.
              </Text>
            </VStack>
          </VStack>
          <VStack width={'100%'}>
            <Divider bgColor={colors.btnBgColor_selected} />
            <HStack>
              <TouchableOpacity
                style={styles.detailModalButton}
                onPress={() => {
                  action && action();
                  setModalState(false, '');
                }}>
                <Text style={fonts_styles.bold} color={colors.txtColor_bg}>
                  Complete Now
                </Text>
              </TouchableOpacity>
              <Divider
                orientation="vertical"
                bgColor={colors.btnBgColor_selected}
              />
              <TouchableOpacity
                style={styles.detailModalButton}
                onPress={() => {
                  setModalState(false, '');
                }}>
                <Text style={fonts_styles.bold} color={colors.txtColor_bg}>
                  Later
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </VStack>
      )
    );
  };

  return (
    <Modal isOpen={isModalVisible}>
      <ModalBackdrop backgroundColor={colors.backdropColor} />
      {modalType === 'DefaultCurrency' && <DefaultCurrency />}
      {modalType === 'MessageConfirm' && <MessageConfirm />}
      {modalType === 'CompleteProfile' && <CompleteProfile />}
      {modalType === 'CompleteKYC' && <CompleteKYC />}
      {modalType === 'ConfirmDelete' && <ConfirmDelete />}
    </Modal>
  );
};

const styles = StyleSheet.create({
  welcomeModalContent: {
    width: width * 0.9,
    backgroundColor: colors.bgColor,
    alignItems: 'center',
    borderRadius: defaultBorderRadius,
  },
  welcomeModalButton: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  detailModalButton: {
    width: '50%',
    alignItems: 'center',
    padding: 15,
  },
  completeItems: {
    alignItems: 'center',
    gap: 8,
  },
});

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const ModalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [btnText, setBtnText] = useState('');
  const [leftBtnText, setLeftBtnText] = useState('');
  const [rightBtnText, setRightBtnText] = useState('');
  const [action, setAction] = useState<(() => void) | undefined>(undefined);

  const setModalState: ModalContextProps['setModalState'] = (
    isVisible,
    type,
    title = '',
    content = '',
    btnText = '',
    action,
  ) => {
    setIsModalVisible(isVisible);
    setModalType(type);

    switch (type) {
      case 'MessageConfirm':
        setTitle(title);
        setContent(content);
        setBtnText(btnText);
        setAction(() => action);
        break;
      default:
        setTitle('');
        setContent('');
        setBtnText('');
        setAction(() => action);
        break;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        modalType,
        title,
        content,
        btnText,
        leftBtnText,
        rightBtnText,
        setModalState,
        action,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export {ModalProvider, useModal};

export default GlobalModal;