import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { addToCart, loadFavItem } from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { useIsFocused } from "@react-navigation/native";


const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
  });
};

const Favourite = () => {
  const focus = useIsFocused();

  const navigation = useNavigation<any>();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [favItemList, setFavItemList] = useState([]);
  const { favouriteItem, addFavouriteItemList,addingItemInCart,addAllFavItemInCart} = useMyContext();
  // console.log("favItem",favouriteItem);


  const loadFav = async () => {
    const response = await loadFavItem();
    // setFavItemList(response);
    addFavouriteItemList(response);
  }

  useEffect(() => {
    loadFav();
  }, [focus])

  const addingAllFavItemInCart =  async () => {
    let i = 0;
      for(i = 0 ; i < favouriteItem?.length ; i++){
        addAllFavItemInCart(favouriteItem[i]);
      }
    }

  const renderItem = ({ item }: any) => (
    <View key={item?.product_id} style={{
      width: "100%"
    }}>
      <TouchableOpacity onPress={() =>
        navigation.navigate("Productdetail", {
          id: item.product_id,
        })
      }>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
          }}
        >
          <View style={{ width: "15%" }}>
            <Image
              source={{ uri: item?.product_imagename }}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: 1,
                // borderColor: "black",
              }}
            />
          </View>

          <View style={{ width: "40%",marginTop:17 }}>
            <Text style={styles.itemName}>{item?.product_name}</Text>
            <Text style={styles.itemVolume}>{item.volume}</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
              width: "20%",
            }}
          >
            <View
              style={{
                display: "flex",
                gap: 25,
                width: 50,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight:"bold" }}>₹{item?.price}</Text>
              <Image source={require("../../assets/Vector.png")} />
            </View>
          </View>
        </View>
        <Text
          style={{
            width: "100%",
            backgroundColor: "#e3e1e1",
            height: 1,
            fontWeight: "500",
          }}
        ></Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorurite</Text>
      <Text
        style={{
          width: "100%",
          backgroundColor: "#e3e1e1",
          height: 1,
          fontWeight: "500",
        }}
      ></Text>
      { favouriteItem.length > 0 ? <FlatList
        showsVerticalScrollIndicator={false}
        data={favouriteItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      /> : <View style={{paddingTop:300,minHeight:600}}><Text style={{fontSize:15,fontWeight:"500",textAlign:"center"}}>Please add yours{"\n"}Favourite Products</Text></View> }
      <View>
       
       {favouriteItem?.length > 0 ? <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#69AF5D",
            paddingVertical: 20,
            borderRadius: 10,
          }}
          onPress={() => addingAllFavItemInCart()}
        >
          <Text style={styles.addToCartButtonText} >Add all to cart</Text>
        </TouchableOpacity> : <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#69AF5D",
            paddingVertical: 20,
            borderRadius: 10,
          }}
          onPress={() => navigation.replace("SearchScreen")}
        >
          <Text style={styles.addToCartButtonText} >Go to Category</Text>
        </TouchableOpacity>
}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
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
    marginBottom: 20
  },
  listContainer: {
    flexGrow: 1,
  },
  favouriteItem: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#c9c7c7",
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    // marginLeft: 10,
    // justifyContent: 'center',
    backgroundColor: "red",
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Gilroy-Bold",
  },
  itemPrice: {
    marginLeft: 200,
    fontSize: 16,
    color: "#333",
    fontFamily: "Gilroy-Semibold",
  },
  itemVolume: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Gilroy-Medium",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  addToCartButton: {
    backgroundColor: "#69AF5D",
    width: 300,
    height: 67,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 35,
    marginBottom: 30,
    marginLeft: 23,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addToCartButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gilroy-Semibold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color:"white",
    fontWeight:"bold"
  },
});

export default Favourite;



