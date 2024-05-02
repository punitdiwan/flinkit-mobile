import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProvider } from './src/context/Context';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SearchScreen from './src/screens/SearchScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import AddAddress from './src/screens/AddAddressScreen';
import OrderListScreen from './src/screens/OrderListScreen';
import { useMyContext } from './src/context/Context';
import Login from './src/screens/Authentication/Login';
import Otp from './src/screens/Authentication/Otp';
import { useState } from 'react';


export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  SearchScreen: undefined;
  CategoryScreen: undefined;
  AddAddress: undefined;
  OrderListScreen: undefined;
  Login: undefined;
  Otp: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const { categoryName } = useMyContext();
  // const [isSignedIn, setisSignedIn] = useState<boolean>(false)
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {isSignedIn ? (<>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "Search" }} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: "Category" }} />
            <Stack.Screen name="AddAddress" component={AddAddress} options={{ title: "Add Address" }} />
            <Stack.Screen name="OrderListScreen" component={OrderListScreen} options={{ title: "Order List" }} />
          </>)
            : (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
              </>)} */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "Search" }} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: "Category" }} />
          <Stack.Screen name="AddAddress" component={AddAddress} options={{ title: "Add Address" }} />
          <Stack.Screen name="OrderListScreen" component={OrderListScreen} options={{ title: "Order List" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({

});