import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyProvider } from "./src/context/Context";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import SearchScreen from "./src/screens/SearchScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import AddAddress from "./src/screens/AddAddressScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import { useMyContext } from "./src/context/Context";
import Product_Details from "./src/screens/Product_Details";

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  SearchScreen: undefined;
  CategoryScreen: undefined;
  AddAddress: undefined;
  Address: undefined;
  Product_Details: {name:string,imgUrl:string};
  OrderListScreen: undefined;

  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const { categoryName } = useMyContext();
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
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
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({});
