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
// import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
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
    name: "Orders",
    img: require("../../assets/Orders icon.png"),
    navigate: "Orderaccepted",
  },
  {
    id: "2",
    name: "YourProfile",
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
  const [showOrderPage,setShowOrderPage] = useState(false);


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
          <View style={{width:63.5,height:63.5,justifyContent:"center",alignItems:"center",paddingTop:2,paddingBottom:2,paddingHorizontal:2}}>
          <Image
            source={require("../../assets/person.png")}
            resizeMode="cover"
            style={{ width: 63, height: 63, borderRadius:100}}
          />
          </View>

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
              <Text style={{ fontSize: 20,fontWeight:"bold" }}>
                User Name
              </Text>
              <Feather name="edit-2" size={20} color="#69AF5D" />
            </View>
            <Text style={{ color: "rgb(214,214,214)", fontSize: 16 }}>
              user@gmail.com
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", height: "auto", padding: 5 }}>
          {arr?.map((item) =>{
            return (
            <TouchableOpacity
              key={item.id}
              style={{
                width: "100%",
                height: 60,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                borderBottomWidth: 0.5,
                borderColor: "#E2E2E2",
                // paddingVertical:10
              }}
              onPress={() => navigation.navigate(`${item?.name}`)}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                <Image source={item.img} />
                <Text style={{ fontFamily: "Gilroy-SemiBold.ttf",fontWeight:"bold" }}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Image source={require("../../assets/Vector.png")} />
              </View>
            </TouchableOpacity>
          )})}
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 150,
            paddingHorizontal:20,
            position:"absolute",
            bottom:0
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              backgroundColor: "rgb(242,243,242)",
              borderRadius: 10,
              position: "relative"
            }}
            onPress={() => {
              // dispatch(clearCartList());
              navigation.replace("Onboarding");
             
            }}
          >
            <Text style={{ color: "#69AF5D", fontSize: 18,fontWeight:"semibold" }}>Log Out</Text>
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
