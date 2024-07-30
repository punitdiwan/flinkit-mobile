import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { loadFavItem, removeFromFavourite } from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { useIsFocused } from "@react-navigation/native";
import { imageUrl } from "../../lib/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
  });
};

const Favourite = () => {
  const focus = useIsFocused();
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [favItemList, setFavItemList] = useState([]);
  const { favouriteItem, addFavouriteItemList, addAllFavItemInCart } = useMyContext();

  const loadFav = async () => {
    const userId = await AsyncStorage.getItem("userMobileNumber");
    const response = await loadFavItem(userId);
    addFavouriteItemList(response);
  };


  // handle unfavourite item
  const handleUnfavouriteItem = async (productId) => {
     await removeFromFavourite(productId);
     loadFav();
  }

  useEffect(() => {
    loadFav();
  }, [focus]);

  const addingAllFavItemInCart = async () => {
    favouriteItem.forEach(item => addAllFavItemInCart(item));
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Productdetail", { id: item.product_id })}>
        <View style={styles.itemContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }}
              style={styles.itemImage}
            />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item?.product_name}</Text>
            <Text style={styles.itemVolume}>{item.volume}</Text>
          </View>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>₹{item?.price}</Text>
            {/* <SimpleLineIcons name="arrow-right" size={18} color="black" /> */}
            <TouchableOpacity onPress={() => {handleUnfavouriteItem(item?.product_id)}}>
                <Entypo name="heart" size={30} color={"red"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
      <View style={styles.separator} />
      {favouriteItem.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favouriteItem}
          renderItem={renderItem}
          keyExtractor={(item) => item?.product_id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Please add your{'\n'}Favourite Products</Text>
        </View>
      )}
      {favouriteItem.length > 0 ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={addingAllFavItemInCart}
          >
            <Text style={styles.addToCartButtonText}>Add all to cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goToCategoryButton}
            onPress={() => navigation.replace("SearchScreen")}
          >
            <Text style={styles.goToCategoryButtonText}>Go to Category</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Gilroy-Bold",
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    width: "100%",
  },
  itemContent: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "15%",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    width: "40%",
    marginTop: 17,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "Gilroy-Bold",
  },
  itemVolume: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Gilroy-Medium",
  },
  itemPriceContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 15,
  },
  vectorImage: {
    width: 24,
    height: 24,
  },
  separator: {
    width: "100%",
    backgroundColor: "#e3e1e1",
    height: 1,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height * 0.6,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  addToCartButton: {
    width: "100%",
    backgroundColor: "#69AF5D",
    paddingVertical: 15,
    borderRadius: 10,
  },
  addToCartButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gilroy-Semibold",
    color: "white",
    fontWeight: "bold",
  },
  goToCategoryButton: {
    width: "100%",
    backgroundColor: "#69AF5D",
    paddingVertical: 15,
    borderRadius: 10,
  },
  goToCategoryButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gilroy-Semibold",
    color: "white",
    fontWeight: "bold",
  },
});

export default Favourite;


