import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';

const { width, height } = Dimensions.get("window");

const About = () => {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gilroy-Semibold': require("../../assets/fonts/Gilroy-SemiBold.ttf"),
        'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // You can render a loading indicator here if needed
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.gilroySemibold]}>About Us</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionText, styles.gilroyRegular]}>
          Flinkit is India's most beloved online grocery shopping platform. Our app is changing the way customers approach their daily essentials. You can now shop online for groceries, fresh fruits and vegetables procured daily, dairy & bakery, beauty & wellness, personal care, household care, diapers & baby care, pet care, meats and seafood as well as the latest products from leading brands like Cadbury, ITC, Colgate-Palmolive, PepsiCo, Aashirvaad, Saffola, Fortune, Nestle, Amul, Dabur, and many more. Imagine if you could get anything delivered to you in minutes. Milk for your morning chai. The perfect shade of lipstick for tonight's party. Even an iPhone.
        </Text>
        <View style={styles.separator} />
        <Text style={[styles.sectionText, styles.gilroyRegular]}>
          Our superfast delivery service aims to help consumers in India save time and fulfill their needs in a way that is frictionless. We will make healthy, high-quality and life-improving products available to everyone instantly so that people can have time for the things that matter to them.
        </Text>
        <View style={styles.separator} />
        <Text style={[styles.sectionText, styles.gilroyRegular]}>
          'Blinkit' is owned & managed by 'Blink Commerce Private Limited' (formerly known as Grofers India Private Limited) and is not related, linked or interconnected in whatsoever manner or nature, to 'GROFFR.COM' which is a real estate services business operated by 'Redstone Consultancy Services Private Limited'.
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.separator} />
        <Text style={[styles.sectionLink, styles.gilroyRegular]}>Privacy Policy</Text>
        <View style={styles.separator} />
        <Text style={[styles.sectionLink, styles.gilroyRegular]}>Terms & Conditions</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: width * 0.05,
    backgroundColor:"#fff"
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: width * 0.07,
    fontWeight: "300",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: width * 0.04,
    fontWeight: "300",
    lineHeight: 24,
    marginBottom: 10,
  },
  sectionLink: {
    fontSize: width * 0.04,
    fontWeight: "300",
    paddingVertical: 10,
  },
  gilroySemibold: {
    fontFamily: 'Gilroy-Semibold',
  },
  gilroyRegular: {
    fontFamily: 'Gilroy-Medium',
  },
  gilroyBold: {
    fontFamily: 'Gilroy-Bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "rgb(183, 183, 183)",
    marginBottom: 10,
  },
});

export default About;

