import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}: any) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={item.image == '' ? '' : item.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    flex: 0.6,
    width: '90%',
  },
  content: {
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    width: '90%',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
