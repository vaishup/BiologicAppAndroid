import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {listTheShifts, getTheStaff} from '../graphql/queries';

import dayjs from 'dayjs';
import {Button, Modal, HStack, VStack} from '@gluestack-ui/themed';
import Header from '../components/Header';
import {Hourglass, Navigation} from 'lucide-react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getTableID} from '../hooks/authServices.tsx';
import {generateClient} from 'aws-amplify/api';

const {width, height} = Dimensions.get('window');

const colors = {
  bgColor: '#F3F4F6',
  card1: '#3bb0de',
  card2: '#FF7F7F',
  card3: '#A695F9',
  card4: '#ff9966',
  txtColor_bg: '#4B5563',
  btnBgColor_secondary: '#E5E7EB',
  success: '#34D399',
};

const Home = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [upcoming, setUpcoming] = useState('');
  const [previous, setPrevious] = useState('');
  const [status, setStatus] = useState('');
  const [shiftLiss, setShiftList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      listStaff();
    }, [status]), // Empty dependency array ensures it runs only when the screen comes into focus
  );
  const getUser = async () => {
    const userId = await getTableID();
    try {
      console.log('Fetching staff with ID:', userId); // Debug log
      const staffData = await API.graphql({
        query: getTheStaff, // Replace with your actual query to get staff by ID
        variables: {id: userId},
      });
      const staff = staffData.data.getTheStaff;
      setName(staff.name);
      setStatus(staff.profileStatus); // Set the status
      updateShiftList(staff.profileStatus, upcoming, previous);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const API = generateClient();
  const updateShiftList = (profileStatus, upcoming, previous) => {
    const newShiftList = [
      {
        id: '1',
        Location: 'View Shifts',
        startTime: `Status: ${upcoming} upcoming, ${previous} completed`, // Dynamic shift counts
        duties: 'Review upcoming and past shifts',
        image: require('../assets/checklist.png'),
        onPress: () => {
          if (profileStatus !== 'Pending') {
            navigation.navigate('ShiftList'); // Navigate only if profile is not pending
          } else {
            alert('Your profile is pending. Please wait for admin approval.'); // Display an alert if pending
          }
        },
      },
      {
        id: '2',
        Location: 'Profile',
        startTime: `Status: ${profileStatus || 'N/A'}`, // Use the fetched status
        duties: 'Update personal and contact information',
        image: require('../assets/resume.png'),
        onPress: () => navigation.navigate('ViewProfile'),
      },
      {
        id: '3',
        Location: 'Settings',
        startTime: 'Change your password for enhanced security',
        duties: '',
        image: require('../assets/setings.png'),
        onPress: () => navigation.navigate('Settings'),
      },
      {
        id: '4',
        Location: 'View ID',
        startTime: 'View and manage your unique ID',
        duties: '',
        image: require('../assets/id.png'),
        onPress: () => navigation.navigate('ViewID'),
      },
    ];
    setShiftList(newShiftList); // Update the shift list state
  };

  const listStaff = async () => {
    const userId = await getTableID(); // Fetch the user ID
    try {
      const staffdata = await API.graphql({
        query: listTheShifts,
        variables: {
          filter: {
            staffId: {
              eq: userId, // Filter shifts by staffId
            },
          },
        },
      });

      const shiftsList = staffdata.data.listTheShifts.items;
console.log("shiftsList...",shiftsList);

      // Sort the shifts by createdAt date
      const sortedShifts = shiftsList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      // Get the current time
      const currentTime = dayjs();
      let upcomingCount = 0;
      let completedCount = 0;

      // Loop through the shifts and count upcoming and completed shifts
      sortedShifts.forEach(shift => {
        const shiftStartTime = dayjs(shift.startTime);

        if (shiftStartTime.isAfter(currentTime)) {
          upcomingCount++; // Increment upcoming shift counter
        } else {
          completedCount++; // Increment completed shift counter
        }
      });

      console.log(`Upcoming: ${upcomingCount}, Completed: ${completedCount}`);
      setPrevious(upcomingCount);
      setUpcoming(completedCount);
      // Use the counts to display in your UI or pass them where needed
      //updateShiftListWithCounts(upcomingCount, completedCount);
    } catch (error) {
      console.error('Error fetching shifts or staff details:---', error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false} // Hide vertical scrollbar
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <VStack style={styles.container}>
              <HStack
                style={styles.headerRow}
                alignItems="center"
                justifyContent="space-between">
                <Text style={styles.headerTexts}>Welcome To Bio-Logic</Text>
                <Image
                  alt="Logo Styles"
                  source={require('../assets/logoa.png')}
                  style={styles.imageStyle}
                />
              </HStack>
            </VStack>

            <Text style={styles.nameText}>{name}</Text>
            {status === 'Pending' && (
              <View style={styles.pendingCard}>
                <Hourglass color="#FFC107" />
                <Text style={styles.pendingText}>Your Profile is Pending</Text>
                <Text style={styles.pendingSubText}>
                  Please wait for admin approval before accessing View Shifts.
                </Text>
              </View>
            )}
            {shiftLiss.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress} // Handle the onPress action
              >
                <View
                  key={item.id}
                  style={[
                    styles.card,
                    index === 0
                      ? styles.card1
                      : index === 1
                      ? styles.card2
                      : index === 2
                      ? styles.card3
                      : styles.card4, // Add a condition for card4
                  ]}>
                  <Image source={item.image} width={10} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.Location}</Text>
                    <Text style={styles.cardTime}>{item.startTime}</Text>
                    <Text style={styles.cardDuties}>{item.duties}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              size="md">
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Your Shift Starts Soon</Modal.Header>
                <Modal.Body>
                  <Text>Start your shift</Text>
                </Modal.Body>
                <Modal.Footer>
                  <HStack space={4}>
                    <Button
                      backgroundColor={colors.btnBgColor_secondary}
                      onPress={() => setShowModal(false)}
                      size="lg">
                      Cancel
                    </Button>
                    <Button
                      backgroundColor={colors.success}
                      onPress={() => console.log('Shift Started')}
                      size="lg">
                      Start
                    </Button>
                  </HStack>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Home;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    alignSelf: 'center',
    width: width * 0.9,
  },
  contentContainer: {
    paddingVertical: 20,
    minHeight: height * 0.9,
  },
  headerText: {
    color: colors.txtColor_bg,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
  nameText: {
    color: colors.txtColor_bg,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    padding: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card1: {
    backgroundColor: colors.card1,
  },
  card2: {
    backgroundColor: colors.card2,
  },
  card3: {
    backgroundColor: colors.card3,
  },
  card4: {
    backgroundColor: colors.card4,
  },
  image: {
    width: 50,
    height: 50,
    padding: 3,

    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  cardTime: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  cardDuties: {
    color: '#fff',
    fontSize: 14,
  },
  container: {
    borderRadius: 10, // Optional rounded corners
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTexts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color
  },
  imageStyle: {
    width: 50, // Adjust logo size
    height: 50,
    resizeMode: 'contain',
  },
  pendingCard: {
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  pendingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFC107',
    marginTop: 8,
  },
  pendingSubText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
    textAlign: 'center',
  },
});
