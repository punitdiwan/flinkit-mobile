import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const arr = [
  { id: "1", name: "Orders", img: require("../../assets/Orders icon.png"), navigate: "Orderaccepted" },
  { id: "2", name: "YourProfile", img: require("../../assets/cardprofile.png") },
  { id: "3", name: "Delivery Address", img: require("../../assets/location-profile.png") },
  { id: "4", name: "Payment Methods", img: require("../../assets/secure-payment.png") },
  { id: "5", name: "Promo Card", img: require("../../assets/Promo Cord icon.png") },
  { id: "6", name: "Notifications", img: require("../../assets/notification.png") },
  { id: "7", name: "Help", img: require("../../assets/question.png") },
  { id: "8", name: "About", img: require("../../assets/info.png") },
];

const Profile = ({ navigation }: ProfileProps) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      navigation.replace("Onboarding");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/person.png")} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.profileNameWrapper}>
            <Text style={styles.profileName}>User Name</Text>
            <Feather name="edit-2" size={20} color="#69AF5D" onPress={() => navigation.navigate("EditProfile")} />
          </View>
          <Text style={styles.profileEmail}>user@gmail.com</Text>
        </View>
      </View>

      <View style={styles.optionsList}>
        {arr.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionItem}
            onPress={() => navigation.navigate(item.name)}
          >
            <View style={styles.optionContent}>
              <Image source={item.img} style={styles.optionImage} />
              <Text style={styles.optionText}>{item.name}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#E2E2E2" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutButtonWrapper}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
          <Feather name="log-out" size={24} color="#69AF5D" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical:30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E2E2",
  },
  profileImage: {
    width: 63,
    height: 63,
    borderRadius: 31.5,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  profileNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  profileEmail: {
    color: "rgb(214,214,214)",
    fontSize: 16,
  },
  optionsList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: "#E2E2E2",
    paddingHorizontal: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionImage: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutButton: {
    width: width - 40, // Adjust width relative to screen
    height: 65,
    backgroundColor: "rgb(242,243,242)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoutButtonText: {
    color: "#69AF5D",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutIcon: {
    position: "absolute",
    left: 30,
  },
});

export default Profile;
