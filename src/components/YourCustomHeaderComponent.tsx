import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YourCustomHeaderComponent = ({name}:any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50, // Adjust the height according to your design
    backgroundColor: "white",
    display: "flex", // Customize the background color
  },
  title: {
    fontSize: 18, // Adjust the font size according to your design
    fontWeight: "bold", // Adjust the font weight according to your design
  },
});

export default YourCustomHeaderComponent;
