import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  Divider,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../IconPack";
import { colors } from "../../styles/colors";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";



const UploadBox = ({
  onReturnUri,
  uri,
  placeholder,
  isLoading,
}: {
  onReturnUri: (uri: string) => void;
  uri?: string;
  placeholder?: string;
  isLoading?: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const pb = insets.bottom > 0 ? insets.bottom : 8;
  const [isError, setIsError] = useState(false);
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (fileUri) {
      setIsError(false);
      onReturnUri(fileUri);
    }
  }, [fileUri]);

  useEffect(() => {
    if (uri) {
      setFileUri(uri);
    }
  }, [uri]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      const permission = await check(PERMISSIONS.IOS.CAMERA);
      if (permission === RESULTS.GRANTED) {
        return true;
      } else if (
        permission === RESULTS.DENIED ||
        permission === RESULTS.LIMITED
      ) {
        const granted = await request(PERMISSIONS.IOS.CAMERA);
        return granted === RESULTS.GRANTED;
      } else {
        return false;
      }
    }
  };

  const handleChoosePhoto = async () => {
    setIsOpenPicker(false);
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets && result.assets.length > 0) {
      setFileUri(result.assets[0].uri || '');
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'RxRoute does not have access to your camera.',
        [
          {
            text: 'Go to Settings',
            onPress: () =>
              openSettings().catch(() => console.warn('cannot open settings')),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
      return;
    }
    setIsOpenPicker(false);
    const result = await launchCamera({mediaType: 'photo'});
    if (result.assets && result.assets.length > 0) {
      setFileUri(result.assets[0].uri || '');
    }
  };

  const handleChooseDocument = async () => {
    setIsOpenPicker(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      if (result && result.length > 0) {
        setFileUri(result[0].uri);
        setFileName(result[0].name);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        overflow: 'hidden',
      }}
      onPress={() => setIsOpenPicker(true)}>
      {isLoading ? (
        <Spinner size="large" color="#898989" />
      ) : fileUri ? (
        isError === false ? (
          <Image
            alt="uploaded image"
            source={{uri: fileUri}}
            w="100%"
            h="100%"
            resizeMode="contain"
            onError={() => setIsError(true)}
          />
        ) : (
          <HStack p={20} space="sm" justifyContent="center" alignItems="center">
            <Icon type="fileText" color={colors.onboardingTxt} />
            <Text color={colors.onboardingTxt} size="sm" fontWeight="$medium">
              {fileName || `${placeholder}.pdf`}
            </Text>
          </HStack>
        )
      ) : (
        <HStack space="sm" justifyContent="center" alignItems="center">
          <Icon type="upload" color="#898989" />
          <Text color="#898989" size="lg" fontWeight="$medium">
            {placeholder || 'Upload'}
          </Text>
        </HStack>
      )}

      <Actionsheet
        isOpen={isOpenPicker && !isLoading}
        onClose={() => setIsOpenPicker(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" pb={pb} bgColor="none">
          <VStack width="100%" borderRadius={16} bgColor="white">
            <ActionsheetItem
              alignItems="center"
              justifyContent="center"
              onPress={handleTakePhoto}>
              <ActionsheetItemText size="lg">Take Photo</ActionsheetItemText>
            </ActionsheetItem>
            <Divider h={1} />
            <ActionsheetItem
              alignItems="center"
              justifyContent="center"
              onPress={handleChoosePhoto}>
              <ActionsheetItemText size="lg">Select Photo</ActionsheetItemText>
            </ActionsheetItem>
            <Divider h={1} />
            <ActionsheetItem
              alignItems="center"
              justifyContent="center"
              onPress={handleChooseDocument}>
              <ActionsheetItemText size="lg">
                Select Document
              </ActionsheetItemText>
            </ActionsheetItem>
          </VStack>

          <VStack width="100%" mt={10} borderRadius={16} bgColor="white">
            <ActionsheetItem
              alignItems="center"
              justifyContent="center"
              onPress={() => setIsOpenPicker(false)}>
              <ActionsheetItemText size="lg" fontWeight="$medium">
                Cancel
              </ActionsheetItemText>
            </ActionsheetItem>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </TouchableOpacity>
  );
};

export default UploadBox;

export default UploadBox;
