import {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Box, HStack, Image, Text, View, VStack} from '@gluestack-ui/themed';
import Header from '../components/Header';
import CustomButton from '../components/Button';
import Icon from '../components/IconPack';
import {colors} from '../styles/colors';

const dummyUser = {
  fullname: 'Sherman Lai',
  email: 'sherman@gmail.com',
  phoneNo: '+1 (416) 234-2345',
  profileUri: '',
  interacEmail: 'sherman@gmail.com',
  interacName: 'Sherman Lai',
  bankTransitNumber: '12345',
  bankInstitutionNumber: '98765',
  bankAccountNumber: '312382138912398',
  bankAccountHolderName: 'Sherman Lai',
};

export interface User {
  fullname: string;
  email: string;
  phoneNo: string;
  profileUri: string;
  interacEmail: string;
  interacName: string;
  bankTransitNumber: string;
  bankInstitutionNumber: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(dummyUser);
  }, []);

  return (
    <View>
      <Header
        title="Profile"
        rightBtn="editProfile"
        rightBtnSize={30}
        rightAction={() => {
          console.log('Edit Profile');
        }}
      />
      <VStack p={20} space="4xl">
        {/* ---------------------------- Profile --------------------------------- */}
        <HStack alignItems="center" space="xl" flexWrap="wrap" px={10}>
          <Box style={styles.icon_container}>
            {user?.profileUri ? (
              <Image
                alt="User Profile"
                source={{uri: user.profileUri}}
                style={styles.icon}
              />
            ) : (
              <Icon type={'userPic'} size={100} />
            )}
          </Box>

          <VStack>
            <Text size="lg" fontWeight="bold" color={colors.primary}>
              {user?.fullname}
            </Text>
            <HStack alignItems="center" space="xs">
              <Icon type={'email'} size={15} />
              <Text size="md" color={colors.primary}>
                {user?.email}
              </Text>
            </HStack>
            <HStack alignItems="center" space="xs">
              <Icon type={'phone'} size={15} />
              <Text mt={1} size="md" color={colors.primary}>
                {user?.phoneNo}
              </Text>
            </HStack>
          </VStack>
        </HStack>

        {/* ---------------------------- e-transfer --------------------------------- */}
        <VStack space="xs">
          <Text ml={10}>Interac e-Transfer®</Text>
          <VStack style={styles.container}>
            <Text size="lg" fontWeight="bold">
              {user?.interacName}
            </Text>
            <Text size="md" fontWeight="$semibold">
              {user?.interacEmail}
            </Text>
          </VStack>
        </VStack>

        {/* ---------------------------- Bank Info --------------------------------- */}
        <VStack space="xs">
          <Text ml={10}>Bank Info</Text>
          <VStack space="sm">
            <HStack space="sm">
              <VStack style={styles.container} space="xs" flex={1}>
                <Text size="sm" fontWeight="bold">
                  Transit Number
                </Text>
                <Text size="md" fontWeight="$semibold">
                  {user?.bankTransitNumber}
                </Text>
              </VStack>

              <VStack style={styles.container} space="xs" flex={1}>
                <Text size="sm" fontWeight="bold">
                  Institution Number
                </Text>
                <Text size="md" fontWeight="$semibold">
                  {user?.bankInstitutionNumber}
                </Text>
              </VStack>
            </HStack>

            <VStack style={styles.container} space="xs" flex={1}>
              <Text size="sm" fontWeight="bold">
                Account Number
              </Text>
              <Text size="md" fontWeight="$semibold">
                {user?.bankAccountNumber}
              </Text>
            </VStack>

            <VStack style={styles.container} space="xs" flex={1}>
              <Text size="sm" fontWeight="bold">
                Account Holder Name
              </Text>
              <Text size="md" fontWeight="$semibold">
                {user?.bankAccountHolderName}
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  icon: {
    width: 115,
    height: 115,
    borderRadius: 115,
  },
  icon_container: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
