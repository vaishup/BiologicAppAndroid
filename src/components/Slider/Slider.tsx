import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import {HStack, VStack} from '@gluestack-ui/themed';

const {width, height} = Dimensions.get('window');
const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const Slides = [
    {
      id: 1,
      image: require("../../assets/logo.png"),
      title: 'Welcome to Bio-Logic',
      description:
        '',
    },
    // {
    //   id: 2,
    //   image: "",
    //   title: 'Welcome to Biologic',
    //   description:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    // },
    // {
    //   id: 3,
    //   image: "",
    //   title: 'Welcome to Biologic',
    //   description:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    // },
  ];
  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}: any) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <VStack style={{paddingBottom: width * 0.1, height: height * 0.6}}>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </VStack>
  );
};

export default Slider;

const styles = StyleSheet.create({});
