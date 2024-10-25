import React, { useEffect, useState } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import CustomTextField from "../components/TextField";
import CustomButton from "../components/Button";
import Icon from "../components/IconPack";
import { colors } from "../styles/colors";
import { fonts_styles } from "../styles/font";
// import {signIn, signOut, getCurrentUser} from 'aws-amplify/auth';
import { useAuth } from "../navigation";
// import UploadBox from "../components/Modal/UploadBox";
const { width: screenW, height: screenH } = Dimensions.get("window");
const width = screenW / screenH > 0.9 ? screenW * 0.6 : screenW;
const height = screenH;

const BioMatrics = ({ navigation }: any) => {
  const { setIsUserAuth } = useAuth();
  //   async function handleSignOut() {
  //     try {
  //       await signOut();
  //       setIsUserAuth(false);
  //     } catch (error) {
  //       console.log('Error signing out: ', error);
  //     }
  //   }
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhoneNo] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [fileUri_front, setFileUri_front] = useState<{
    s3Path: string | null;
    prev: string | null;
    curr: string | null;
  }>({ s3Path: null, prev: null, curr: null });
  async function handleProfile() {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setErrMsg("");
      setIsUserAuth(true);
     // navigation.navigate('TabNav');

      //navigation.navigate("CompeleteProfile");
      // const signInResponse = await signIn({
      //   username: email.trim().toLowerCase(),
      //   password: password,
      // });
      // console.log('signInResponse', signInResponse);

      // if (signInResponse.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      //   setIsLoading(false);
      //   navigation.navigate('OTP', {
      //     username: email,
      //     password: password,
      //     isResend: true,
      //   });
      //   return;
      // }
      //setIsUserAuth(true);
    } catch (err: any) {
      console.log("Error in sign-in...", err);
      const message = (err as any).toString().split(":").pop().trim();
      console.log("error...", err);

      // wrong
      setErrMsg("Incorrect username or password");
      // other
      setErrMsg("Sorry! Please try again later");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    // getCurrentUser().then(async user => {
    //   if (user) {
    //     await handleSignOut();
    //   }
    // });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <ScrollView
        bounces={false}
        style={{ alignSelf: "center", width: width }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          minHeight: height * 0.9,
        }}
      >
        <VStack space="2xl">
          <VStack space="sm" alignItems="center">
            <Text
              style={fonts_styles.bold}
              color={colors.txtColor_bg}
              size="3xl"
            >
              Biometrics
            </Text>
          </VStack>

          <VStack flex={1} justifyContent="center">
            <TouchableOpacity
              style={{
                alignSelf: "center",
                justifyContent: "center",
                marginVertical: 20,
              }}
            >
              <Icon
                type={Platform.OS === "ios" ? "ScanFace" : "Fingerprint"}
                size={48}
              />
            </TouchableOpacity>
          </VStack>
        </VStack>

        <VStack space="md"  flex={1} // Ensures the VStack takes up the full height of the screen
            justifyContent="flex-end" // Push the button to the bottom
            alignItems="center" // Center the button horizontally (optional)
            marginBottom={20}>
          {errMsg && (
            <Text
               textAlign="center"
              color={colors.txtColor_danger}
              style={fonts_styles.medium}
            >
              {errMsg}
            </Text>
          )}
          <VStack
         // Optional: Add some space from the bottom of the screen
          >
            <CustomButton
            width={300}
              text="Complete"
              action={handleProfile}
              loading={isLoading}
              backgroundColor={colors.btnBgColor_secondary}
              textColor={colors.white}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BioMatrics;
