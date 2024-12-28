import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardTypeOptions, TouchableOpacity} from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  HStack,
  Input,
  InputField,
  InputSlot,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import Icon from './IconPack';
import {colors} from '../styles/colors';
import {fonts_styles} from '../styles/font';

export interface ISelectItem {
  label: string;
  value: string;
}

interface CustomTextFieldProps {
  // CustomTextField
  title?: string;
  icon?: string;
  iconSize?: number;
  iconRight?: string;
  iconRightSize?: number;
  action?: () => void;
  iconRight2?: string;
  iconRight2Size?: number;
  action2?: () => void;
  prefix?: string;
  error?: string | boolean | any;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  marginTop?: number;
  height?: number;
  width?: number;
  // General
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  // -- InputField
  onFocus?: () => void;
  onBlur?: (e: any) => void;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  type?: 'text' | 'password' | undefined;
  editable?: boolean;
  isMultiline?: boolean;
  textAlign?: 'right' | 'left' | 'center' | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  // -- Select
  isSelect?: boolean;
  isSearch?: boolean;
  selectItems?: ISelectItem[] | string[];
  defaultItem?: string;
  onSelectItem?: (item: ISelectItem) => void;
  // -- Picker
  isPicker?: boolean;
  valueIcon?: string;
  onPress?: () => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  // CustomTextField
  title,
  icon,
  iconSize,
  iconRight,
  iconRightSize,
  action,
  iconRight2,
  iconRight2Size,
  action2,
  prefix,
  error,
  backgroundColor,
  borderColor,
  borderRadius,
  marginTop,
  height,
  width,
  // General
  value,
  onChangeText,
  placeholder,
  isReadOnly,
  isRequired,
  // -- InputField
  onFocus,
  onBlur,
  maxLength,
  keyboardType,
  type,
  editable,
  isMultiline,
  textAlign,
  autoCapitalize,
  // -- Select
  isSelect,
  isSearch,
  selectItems,
  onSelectItem,
  // -- Picker
  isPicker,
  valueIcon,
  onPress,
}) => {
  const h = height || 70;
  const defaultMaxLength = isMultiline === true ? 200 : 50;
  const insets = useSafeAreaInsets();
  const pb = insets.bottom > 0 ? insets.bottom : 8;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const openPicker = () => {
    setSearchTerm('');
    setIsOpen(true);
  };

  return (
    <VStack marginTop={marginTop}>
      <Input
        isRequired={isRequired || false}
        variant="outline"
        height={isMultiline ? h * 1.5 : h}
        width={width || '100%'}
        alignItems="center"
        isReadOnly={isReadOnly || false}
        backgroundColor={backgroundColor || colors.gray2}
        borderRadius={borderRadius || h * 0.2}
        borderColor={
          error ? colors.txtColor_danger : borderColor || 'transparent'
        }
        $focus-borderColor={colors.btnBgColor_selected}
        $focus-borderRadius={borderRadius || h * 0.2}>
        <VStack
          space="sm"
          flex={1}
          paddingHorizontal={h * 0.3}
          alignItems="flex-start">
          {title && (
            <Text size="sm" style={fonts_styles.bold}>
              {title}
            </Text>
          )}
          <HStack space="xs" alignItems="center">
            {icon && (
              <InputSlot mr={8}>
                <Icon
                  type={icon}
                  size={iconSize || 20}
                  color={colors.txtColor_bg}
                />
              </InputSlot>
            )}
            {prefix && (
              <Text color={colors.txtColor_primary} style={fonts_styles.medium}>
                {prefix}
              </Text>
            )}
            {!isSelect && !isPicker ? (
              <InputField
                onChangeText={onChangeText}
                editable={editable ?? true}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                padding={0}
                px={0}
                keyboardType={keyboardType ?? 'default'}
                maxLength={maxLength ?? defaultMaxLength}
                type={type && type}
                autoCorrect={false}
                height={isMultiline ? 60 : 20}
                multiline={isMultiline}
                textAlign={textAlign || 'left'}
                textAlignVertical={isMultiline ? 'top' : 'center'}
                autoCapitalize={autoCapitalize || 'words'}                color={colors.txtColor_bg}
                style={fonts_styles.regular}
              />
            ) : (
              <TouchableOpacity
                onPress={isSelect ? openPicker : onPress}
                style={{
                  height: '100%',
                  flex: 1,
                  marginLeft: -(h * 0.3),
                  paddingLeft: h * 0.3,
                  marginRight: -50,
                  paddingRight: 50,
                  marginVertical: 12,
                  justifyContent: 'center',
                }}>
                <HStack space="sm" alignItems="center">
                  {valueIcon && (
                    <Icon
                      type={valueIcon}
                      size={iconSize || 20}
                      color={colors.txtColor_primary}
                    />
                  )}
                  <Text
                    flex={1}
                    color={value ? colors.txtColor_primary : '#898989'}
                    style={fonts_styles.regular}
                    numberOfLines={1}>
                    {value || placeholder}
                  </Text>
                </HStack>
              </TouchableOpacity>
            )}
            {iconRight2 && (
              <InputSlot mr={4}>
                <TouchableOpacity onPress={action2 || undefined}>
                  <Icon
                    type={iconRight2}
                    size={iconRight2Size || 26}
                    color={colors.txtColor_primary}
                  />
                </TouchableOpacity>
              </InputSlot>
            )}
            {(isSelect || iconRight) && (
              <InputSlot>
                <TouchableOpacity
                  onPress={
                    action ||
                    (isSelect && openPicker) ||
                    (isPicker && onPress) ||
                    undefined
                  }>
                  <Icon
                    type={isSelect ? 'ChevronDown' : iconRight}
                    size={iconRightSize || 26}
                    color={colors.txtColor_bg}
                  />
                </TouchableOpacity>
              </InputSlot>
            )}
          </HStack>
        </VStack>
      </Input>
      {typeof error === 'string' && (
        <VStack marginTop={10} paddingLeft={4}>
          <Text color={colors.txtColor_danger} style={fonts_styles.regular}>
            {error}
          </Text>
        </VStack>
      )}
      {isOpen && (
        <Actionsheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          zIndex={999}>
          <ActionsheetBackdrop bgColor={colors.backdropColor} />
          <ActionsheetContent
            h="$72"
            minHeight={
              selectItems && selectItems.length > 0 && isSearch ? '80%' : 150
            }
            maxHeight="80%"
            bgColor={colors.actionSheetBgColor}
            pb={pb}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {selectItems?.length === 0 && (
              <Text
                style={fonts_styles.semiBold}
                color={colors.txtColor_bg}
                py={16}>
                There is no item.
              </Text>
            )}
            {selectItems && selectItems?.length > 0 && isSearch && (
              <View width="100%" px={8} py={16}>
                <CustomTextField
                  height={60}
                  icon="Search"
                  iconRight={searchTerm.length > 0 ? 'CircleX' : undefined}
                  iconRightSize={20}
                  action={() => setSearchTerm('')}
                  placeholder="Search"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </View>
            )}
            {selectItems && selectItems.length > 0 && (
              <KeyboardAwareScrollView
                bounces={false}
                style={{width: '100%'}}
                keyboardShouldPersistTaps="handled">
                {selectItems
                  .filter(item => {
                    const label = typeof item === 'object' ? item.label : item;
                    return label
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  })
                  .map((item, i) => {
                    const iLabel = typeof item === 'object' ? item.label : item;
                    const iValue = typeof item === 'object' ? item.value : item;

                    const isSelected = iLabel === value;
                    return (
                      <ActionsheetItem
                        key={i}
                        $active-backgroundColor={colors.btnBgColor_selected}
                        backgroundColor={
                          isSelected ? colors.btnBgColor_selected : undefined
                        }
                        onPress={() => {
                          onChangeText && onChangeText(iLabel);
                          onSelectItem &&
                            onSelectItem({label: iLabel, value: iValue});
                          setIsOpen(false);
                        }}>
                        <Text
                          style={fonts_styles.semiBold}
                          color={colors.txtColor_bg}
                          size="md">
                          {iLabel}
                        </Text>
                      </ActionsheetItem>
                    );
                  })}
              </KeyboardAwareScrollView>
            )}
          </ActionsheetContent>
        </Actionsheet>
      )}
    </VStack>
  );
};

export default CustomTextField;