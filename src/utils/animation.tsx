import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const FillView = ({ percentage, fillColor }) => {
  const [fillAnimation] = useState(new Animated.Value(50));

  useEffect(() => {
    animateFill();
  }, []);

  const animateFill = () => {
    Animated.timing(fillAnimation, {
      toValue: percentage,
      duration: 5000, // Adjust duration as needed
      useNativeDriver: false, // Make sure to set useNativeDriver: false for backgroundColor animation
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: `${50}%`,
            backgroundColor: "red",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:7,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: 7,
    borderRadius: 10,
  },
});

export default FillView;
