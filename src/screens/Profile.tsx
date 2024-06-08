import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import AddressList from "../components/AddressList";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { clearCartList } from "../../redux/slices/cartSlice";
// import { useMyContext } from '../context/Context';

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};
const arr = [
  {
    id: "1",
    name: "orders",
    img: require("../../assets/Orders icon.png"),
    navigate: "Orderaccepted",
  },
  {
    id: "2",
    name: "my details",
    img: require("../../assets/My Details icon.png"),
  },
  {
    id: "3",
    name: "Delivery Address",
    img: require("../../assets/Delicery address.png"),
  },
  {
    id: "4",
    name: "Payment Methods",
    img: require("../../assets/Vector icon.png"),
  },
  {
    id: "5",
    name: "Promo Card",
    img: require("../../assets/Promo Cord icon.png"),
  },
  {
    id: "6",
    name: "Notifications",
    img: require("../../assets/Bell icon.png"),
  },
  {
    id: "7",
    name: "Help",
    img: require("../../assets/help icon.png"),
  },
  {
    id: "8",
    name: "About",
    img: require("../../assets/about icon.png"),
  },
];
const ProfileImag =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Profile = ({ navigation, route }: ProfileProps) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const dispatch = useDispatch();

  const cartData = useSelector((store) => store.cart.cartItemList);
  console.log(cartData);
  

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // const {logoutToggle}=useMyContext();

  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        {/* <View style={{ width: "100%", height: "auto" }}>
        <Text style={{ fontSize: 26, fontWeight: "600", margin: 15 }}>
          Saved Addresses{" "}
        </Text>
      </View> */}
        <View
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <Image
            source={{ uri: ProfileImag }}
            resizeMode="cover"
            style={{ width: 64, height: 64, borderRadius: 27 }}
          />
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: 150,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "Gilroy-Bold" }}>
                Test Test
              </Text>
              <Feather name="edit-2" size={20} color="#69AF5D" />
            </View>
            <Text style={{ color: "#7C7C7C", fontSize: 16 }}>
              test@gmail.com
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "auto", padding: 5 }}>
          {arr?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                width: "100%",
                height: 50,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                borderColor: "#E2E2E2",
              }}
              onPress={() => navigation.navigate(`${item.navigate}`)}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Image source={item.img} />
                <Text style={{ fontFamily: "Gilroy-SemiBold.ttf" }}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Image source={require("../../assets/Vector.png")} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 150,
          }}
        >
          <TouchableOpacity
            style={{
              width: 300,
              height: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              backgroundColor: "#F2F3F2",
              borderRadius: 20,
              position: "relative",
              fontFamily: "Gilroy-Semibold",
            }}
            onPress={() => {
              dispatch(clearCartList());
              navigation.replace("Onboarding");
             
            }}
          >
            <Text style={{ color: "#69AF5D", fontSize: 18 }}>Log Out</Text>
            <Feather
              style={{ position: "absolute", left: 30 }}
              name="log-out"
              size={24}
              color="#69AF5D"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
