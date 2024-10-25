import {Dimensions, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import Header from '../components/Header';
import {
  HStack,
  View,
  VStack,
  ScrollView,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
} from '@gluestack-ui/themed';

import * as mutations from '../graphql/mutations';
import ButtonList from '../components/ButtonList';
import {signOut} from '@aws-amplify/auth';
import {useAuth} from '../navigation';
import {useState, useEffect} from 'react';
import {ModalBody} from '@gluestack-ui/themed';
import CustomButton from '../components/Button';
import {colors} from '../styles/colors';

import {getTableID,} from '../hooks/authServices';

import {generateClient} from '@aws-amplify/api';

const {width, height} = Dimensions.get('window');

const client = generateClient();

const Settings = ({navigation}: {navigation: any}) => {
  const [errMsg, setErrMsg] = useState('');
  const [isapplied, setIsApplied] = useState(false);
  const [isappliedIncrease, setIsAppliedIncrease] = useState(false);

  const [isShowApply, setIsShowApply] = useState<
    'close' | 'request' | 'completed'
  >('close');
  const [userType, setUserType] = useState<string | null>(null);
  // const [tableID, setTableID] = useState<string | null>(null);
  const [currentPharLimit, setCurrentPharLimit] = useState<number | null>(null);
  const [remainingPharLimit, setRemainingPharLimit] = useState<number | null>(
    null,
  );



  // const mainDriverRequestsByDriveruserID = /* GraphQL */ `
  //   query MainDriverRequestsByDriveruserID($driveruserID: ID!) {
  //     mainDriverRequestsByDriveruserID(driveruserID: $driveruserID) {
  //       items {
  //         id
  //         status
  //       }
  //     }
  //   }
  // `;

  // const fetchRequestData = async (tableID: string) => {
  //   try {
  //     if (!tableID) {
  //       console.log('No tableID found');
  //       return;
  //     }

  //     console.log('fetchRequestData called', tableID);
  //     const response = await client.graphql({
  //       query: mainDriverRequestsByDriveruserID,
  //       variables: {
  //         driveruserID: tableID,
  //       },
  //     });
  //     console.log(
  //       'response....',
  //       response.data?.mainDriverRequestsByDriveruserID.items[0]?.status,
  //     );

  //     if (response.data?.mainDriverRequestsByDriveruserID.items[0]) {
  //       setIsApplied(true);
  //     }

  //     // Handle the response data as needed
  //     const {data, errors} = response;
  //     if (errors) {
  //       console.error('GraphQL errors:', errors);
  //     } else {
  //       console.log('Request data:', data);
  //     }
  //   } catch (error) {
  //     console.log('Error in fetchRequestData....', error);
  //   }
  // };




  const {setIsUserAuth} = useAuth();

  const handleSignOut = async () => {
    try {
      console.log('handleSignOut called');
      await signOut();
      setIsUserAuth(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const list = [
    {
      icon: 'lock',
      name: 'Change Password',
      path: '',
      showArrow: true,
      action: () => navigation.navigate('ResetPassword'),
    },
  ].filter(item => item.show !== false); // Filter out items that should not be shown

  const SettingsList = () => (
    <>
      <ButtonList list={list} />
    </>
  );


  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={1}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 0}} />
        <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
          <VStack
            style={{
              flex: 1,
              justifyContent: 'space-between',
              height: height,
            }}>
            <VStack>
              <Header title="Settings" />
            </VStack>
            <VStack
              style={{
                flex: 1,
                backgroundColor: '#FAFAFA',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                padding: 20,
              }}>
              <ScrollView bounces={false}>
                <VStack space="md">
                  <SettingsList />
                </VStack>
              </ScrollView>
            </VStack>
          </VStack>

          <Modal isOpen={isShowApply !== 'close'}>
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader justifyContent="center">
                <Text fontSize="$xl" fontWeight="$bold">
                  Remaining Requests: {remainingPharLimit}/{currentPharLimit}
                </Text>
              </ModalHeader>

              <ModalBody>
                <Text textAlign="center">
                  {isShowApply === 'request'
                    ? `Do you want to increase your connection limit? `
                    : 'Your application has been sent.'}
                </Text>
              </ModalBody>

              <ModalFooter padding={15} gap={10}>
                <VStack flex={1} space="sm">
                  {/* {errMsg && <Text color={colors.error}>{errMsg}</Text>} */}
                  <HStack space="md">
                    <View flex={1}>
                      <CustomButton
                        width="100%"
                        text={'Close'}
                        fontWeight="bold"
                        fontSize={18}
                        backgroundColor="#8F8F8F"
                        action={() => setIsShowApply('close')}
                      />
                    </View>
                    {isShowApply === 'request' && (
                      <View flex={1}>
                        <CustomButton
                          text={'Apply'}
                          fontWeight="bold"
                          fontSize={18}
                          width="100%"
                          backgroundColor="#50A99A"
                        />
                      </View>
                    )}
                  </HStack>
                </VStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Settings;