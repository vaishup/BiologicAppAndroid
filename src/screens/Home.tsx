import {Text, View} from '@gluestack-ui/themed';
import Header from '../components/Header';
import Calculator from '../components/Calculator';
import { getFullName } from '../hooks/authServices';
import React, {useEffect, useState} from 'react';

const Home = ({navigation}: {navigation: any}) => {
  const [fullName, setFullName] = useState("Loading...");

  useEffect(() => {
    const fetchFullName = async () => {
      const name = await getFullName();
      if (name) {
        setFullName(name); 
        // Update the state with the fetched full name
      } else {
        setFullName("User"); // Fallback name in case of an error or if name is not found
      }
    };

    fetchFullName();

  }, []);
  return (
    <View>
      <Header
        isShowLogo
        leftBtn="drawer"
        leftAction={() => {
          navigation.openDrawer();
        }}
        rightBtn="user"
        rightAction={() => {
          navigation.navigate('Profile');
        }}
      />
      <View padding={20}>
        <Calculator
          onPress={() => {console.log('From Home Page');}}
        />
      </View>
    </View>
  );
};

export default Home;
