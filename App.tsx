import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyProvider } from "./src/context/Context";
import Signin from "./src/screens/Authentication/Signin";
import Signup from "./src/screens/Authentication/Signup";
import Profile from "./src/screens/Profile";
import Onboarding from "./src/screens/Onboarding";
import Login from "./src/screens/Authentication/Login";
import Maillogin from "./src/screens/Authentication/maillogin";
import SearchScreen from "./src/screens/SearchScreen";
import Orderaccepted from "./src/screens/Orderaccepted";
import ErrorCard from "./src/screens/Errorcard";
import Checkout from "./src/screens/Checkout";
import Otp from "./src/screens/Authentication/Otp";
import AddAddress from "./src/screens/AddAddressScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import Productdetail from "./src/screens/Productdetail";
import Favourite from "./src/screens/Favourite";

import Cart from "./src/screens/Cart";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNav from "./src/screens/BottomNav";
import React, { useEffect, useState, version } from "react";
import { Provider } from "react-redux";
import TopRated from "./src/screens/TopRated";
import About from "./src/screens/About";
import Help from "./src/screens/Help";
import YourProfile from "./src/screens/YourProfile";
import SelectLocation from "./src/screens/SelectLocation";
import Order from "./src/screens/Order";
import TrackOrder from "./src/screens/TrackOrder";
import Orders from "./src/screens/Orders";
import UploadImage from "./src/screens/UploadImage";
import EditProfile from "./src/screens/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import OrderSummary from "./src/screens/OrderSummary";
import SelectAddress from "./src/screens/SelectAddress";
import ConfrimAddress from "./src/components/ConfrimAddress";

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  SearchScreen: undefined;
  CategoryScreen: undefined;
  AddAddress: undefined;
  Address: undefined;
  Category: undefined;
  BottomNav: { route: string; color: string };
  Product_Details: { name: string; imgUrl: string; id: string };
  OrderListScreen: undefined;
  Cart: undefined;
  // Cart: { name: string; imgUrl: string; price: number };

  Login: undefined;
  Otp: undefined;
  Filter: undefined;
  Onboarding: undefined;
  Signin: undefined;
  Maillogin: undefined;
  Signup: undefined;
  Orderaccepted: undefined;
  ErrorCard: undefined;
  Checkout: undefined;
  Productdetail: undefined;
  Favourite: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Maillogin"
            component={Maillogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Profile" component={Profile} />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ title: "Search" }}
          />

          <Stack.Screen
            name="AddAddress"
            component={AddAddress}
            options={{ title: "Current Location", headerShown: true }}
          />
          <Stack.Screen
            name="OrderListScreen"
            component={OrderListScreen}
            options={{ title: "Order List" }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            // options={{ title: "" }}

            options={({ route }) => ({
              title: route?.params?.name,
            })}
          />

          <Stack.Screen
            name="Cart"
            options={{ title: "Cart" }}
            component={Cart}
          />
          <Stack.Screen
            name="Orderaccepted"
            options={{ title: "Orderaccepted" }}
            component={Orderaccepted}
          />
          <Stack.Screen
            name="ErrorCard"
            options={{ title: "ErrorCard" }}
            component={ErrorCard}
          />
          {/* <Stack.Screen
            name="Checkout"
            options={{ title: "Checkout" }}
            component={Checkout}
          /> */}
          <Stack.Screen
            name="Productdetail"
            options={{ title: "Productdetail" }}
            component={Productdetail}
          />
          <Stack.Screen
            name="Favourite"
            options={{ title: "Favourite" }}
            component={Favourite}
          />
          <Stack.Screen
            name="TopRated"
            component={TopRated}
            options={{ title: "Top Rated" }}
          />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen
            name="YourProfile"
            component={YourProfile}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="SelectLocation"
            component={SelectLocation}
            options={{ title: "Location" }}
          />
          <Stack.Screen
            name="Order"
            component={Order}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ title: "Order History" }}
          />

          <Stack.Screen
            name="OrderSummary"
            component={OrderSummary}
            options={{ headerShown: true }}
          />

          <Stack.Screen name="UploadImage" component={UploadImage} />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: "Edit Profile" }}
          />

          <Stack.Screen
            name="SelectAddress"
            component={SelectAddress}
            options={{ title: "Select Address" }}
          />

          <Stack.Screen
            name="ConfirmAddress"
            component={ConfrimAddress}
            options={{ title: "Confrim Address" }}
          />

         
        </Stack.Navigator>
        <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({});
