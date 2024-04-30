import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProvider } from './src/Context/Context';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SearchScreen from './src/screens/SearchScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import AddAddress from './src/screens/AddAddressScreen';
import { useMyContext } from './src/Context/Context';
import { useState } from 'react';


export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  SearchScreen:undefined;
  CategoryScreen: undefined;
  AddAddress:undefined;

  // Feed: { sort: 'latest' | 'top' } | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const {categoryName}=useMyContext();
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title:"Search"}}/>
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{title:"Categorys"}}/>
          <Stack.Screen name="AddAddress" component={AddAddress} options={{title:"Add Address"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({

});
