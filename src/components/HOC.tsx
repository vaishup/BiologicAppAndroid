import {ScrollView, StatusBar, View} from '@gluestack-ui/themed';
import React from 'react';
import {Platform, SafeAreaView} from 'react-native';

interface Props {
  navigation: any; // Adjust the type if possible
}

const HOC = <P extends Props>(WrappedComponent: React.ComponentType<P>) => {
  //this is the higher order component
  //this wraps each screen, and saves you from repeating yourself
  //changes here will mean you have to restart ur server *sometimes*
  //if you make a change and dont see it show up, kill terminal and run start again, it should work
  const ios = Platform.OS === 'ios';
  return (props: any) => {
    if (!WrappedComponent) {
      return null;
    }
    return (
      // edit these styles0
      <>
        {ios ? (
          <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#f5f5f5'}} />
            <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
              <ScrollView bounces={false}>
                <WrappedComponent {...props} />
              </ScrollView>
            </SafeAreaView>
          </>
        ) : (
          <ScrollView flex={1}>
            <WrappedComponent {...props} />
          </ScrollView>
        )}
      </>
    );
  };
};

export default HOC;
