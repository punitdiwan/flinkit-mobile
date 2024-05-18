import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Entypo";
import Ionicons2 from "@expo/vector-icons/MaterialIcons";
import Ionicons3 from "@expo/vector-icons/FontAwesome";
import Ionicons4 from "@expo/vector-icons/FontAwesome6";
import Home from "./Home";
import Profile from "./Profile";
import { useMyContext } from "../context/Context";
import Cart from "./Cart";
import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./CategoryScreen";
const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomNav = () => {
  const { cartItem } = useMyContext();
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
              return <Ionicons name="home" color={color} size={25} />;
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return <Ionicons3 name="user-circle" color={color} size={25} />;
            } else if (route.name === "Cart") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return <Ionicons4 name="cart-plus" color={color} size={25} />;
            } else if (route.name === "Category") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return <Ionicons2 name="category" color={color} size={25} />;
            }
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "green",

          tabBarLabelStyle: {
            textAlign: "center",
            marginBottom: 10,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,

            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home" color={color} size={25} />;
            },
          }}
        />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title: "Category",
            headerShown: true,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons2 name="category" color={color} size={25} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerShown: true,

            tabBarIcon: ({ color, size }) => {
              return <Ionicons3 name="user-circle" color={color} size={25} />;
            },
          }}
        />

        {cartItem.length === 0 ? (
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              title: "Cart",
              headerShown: true,
              tabBarIcon: ({ color, size }) => {
                return <Ionicons4 name="cart-plus" color={color} size={25} />;
              },
            }}
          />
        ) : (
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: true,
              tabBarBadge: cartItem.length,

              tabBarIcon: ({ color, size }) => {
                return <Ionicons4 name="cart-plus" color={color} size={25} />;
              },
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
};

export default BottomNav;
