import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyProvider } from "./src/context/Context";

import Profile from "./src/screens/Profile";
import Login from "./src/screens/Authentication/Login";
import SearchScreen from "./src/screens/SearchScreen";
import Otp from "./src/screens/Authentication/Otp";
import AddAddress from "./src/screens/AddAddressScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import Product_Details from "./src/screens/Product_Details";

import Cart from "./src/screens/Cart";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNav from "./src/screens/BottomNav";

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
            name="Home"
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
            options={{ title: "Add Address" }}
          />
          <Stack.Screen
            name="OrderListScreen"
            component={OrderListScreen}
            options={{ title: "Order List" }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ title: "Category" }}
          />

          <Stack.Screen
            name="Product_Details"
            component={Product_Details}
            options={{ title: "Product Details" }}
          />
          <Stack.Screen
            name="Cart"
            options={{ title: "Cart" }}
            component={Cart}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({});
