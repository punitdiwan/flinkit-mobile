import { View, Text } from "react-native";
import * as React from "react";
import Ionicons from "@expo/vector-icons/Entypo";
import Ionicons4 from "@expo/vector-icons/FontAwesome6";
import Home from "./Home";
import Profile from "./Profile";
import Favourite from "./Favourite";
import { useMyContext } from "../context/Context";
import Cart from "./Cart";
import SearchScreen from "./SearchScreen";
import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import YourCustomHeaderComponent from "../components/YourCustomHeaderComponent";
import Filter from "./Filter";
// import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomNav = () => {
  const { cartItem } = useMyContext();
  console.log(cartItem);
  
  // const cartItemList = useSelector(store => store?.cart?.cartItemList);
  // console.log("Nav",cartItemList);
  
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
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={25}
                  color={color}
                />
              );
            } else if (route.name === "Cart") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return <Feather name="shopping-cart" size={24} color={color} />;
            } else if (route.name === "Category") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return (
                <MaterialIcons name="manage-search" size={24} color={color} />
              );
            } else if (route.name === "Favourite") {
              iconName = focused ? "ios-list" : "ios-list-outline";
              return <Entypo name="heart-outlined" size={24} color="black" />;
            }
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "black",

          tabBarLabelStyle: {
            textAlign: "center",
            marginBottom: 10,
          },
          tabBarShowLabel: true,
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
          name="Search"
          component={SearchScreen}
          options={{
            // title: "SearchScreen",
            // headerShown: true,
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons name="manage-search" size={30} color={color} />
              );
            },
            header: () => <YourCustomHeaderComponent name={"Find Products"} />,
          }}
        />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              title: "Cart",
              headerShown: true,
              tabBarBadge: cartItem.length,

              tabBarIcon: ({ color, size }) => {
                return <Feather name="shopping-cart" size={25} color={color} />;
              },
              header: () => <YourCustomHeaderComponent name={"My Cart"} />,
            }}
          />
        {/* ) : (
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: true,
              tabBarBadge: cartItemList.length,

              tabBarIcon: ({ color, size }) => {
                return <Ionicons4 name="cart-plus" color={color} size={30} />;
              },
            }}
          />
        )} */}
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            headerShown: false,

            tabBarIcon: ({ color, size }) => {
              return <Entypo name="heart-outlined" size={24} color={color} />;
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,

            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={25}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Filter"
          component={Filter}
          options={{ tabBarItemStyle: { display: "none" }, headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNav;
