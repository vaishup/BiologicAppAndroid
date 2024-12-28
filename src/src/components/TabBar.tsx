import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { HStack, SafeAreaView, Text, View } from "@gluestack-ui/themed";

import Icon from "./IconPack";
import { colors } from "../styles/colors";

const { width, height } = Dimensions.get("window");

const TabBar = ({ navigation, state }: any) => {
  const getIconColor = (routeName: any) => {
    const isCurrentRoute = state.routeNames[state.index] === routeName;
    return isCurrentRoute ? "#006299" : colors.secondary; // Replace 'activeColor' and 'inactiveColor' with your actual colors
  };

  return (
    <SafeAreaView
      backgroundColor="white"
      borderTopLeftRadius={15}
      borderTopRightRadius={15}
    >
      <HStack height={60} alignItems="center">
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Icon type={"HouseIcon"} color={getIconColor("TransactionHistory")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => {
           navigation.navigate("ViewProfile");
          }}
        >
          <Icon type={"CircleUserRound"} color={getIconColor("Notification")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() => {
       navigation.navigate("Settings");
          }}
        >
          <Icon type={"Settings"} color={getIconColor("Notification")} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon type={'CircleUser'} color={getIconColor('Notification')} />
        </TouchableOpacity> */}
      </HStack>
    </SafeAreaView>
  );
};

export default TabBar;
