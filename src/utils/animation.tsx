import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const FillView = ({ percentage, fillColor }) => {
  const fillStyle = {
    width: `${percentage}%`,
    backgroundColor: fillColor,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.fill, fillStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default FillView;
