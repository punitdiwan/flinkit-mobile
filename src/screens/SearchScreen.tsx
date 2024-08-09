import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Category from "../components/Category";
import { getAllProducts } from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { imageUrl } from "../../lib/constant";
import { checkProductQuantity, CustomAlert } from "../utils/CheckQuantity";

const SearchScreen = ({ navigation }:any) => {
  const focus = useIsFocused();
  const [text, setText] = useState("");
  const [dummyData, setDummyData] = useState([]);
  const [alertsVisible, setAlertsVisible] = useState({});

  const {
    cartItem,
    addingItemInCart,
    decreaseCartQuantity,
    increaseCartQuantity,
  } = useMyContext();

  const handleInputChange = (inputText:any) => {
    setText(inputText);
  };

  const filterData = dummyData.filter((item) =>
    item.product_name.toLowerCase().includes(text.toLowerCase())
  );

  const getProducts = async () => {
    const productData = await getAllProducts();
    setDummyData(productData);
  };

  

  useEffect(() => {
    getProducts();
    setText("");
  }, [focus]);

  const showAlert = (itemId:any) => {
    setAlertsVisible((prev) => ({ ...prev, [itemId]: true }));
  };

  const closeAlert = (itemId:any) => {
    setAlertsVisible((prev) => ({ ...prev, [itemId]: false }));
  };

  const renderItem = ({ item }:any) => {
    const isAlertVisible = alertsVisible[item.product_id] || false;
    
    // const moreCharacter = item?.product_name?.length > 15 ;
    // const productName = moreCharacter ? item?.product_name.slice(0,15) : item?.product_name;

    return (
      <TouchableOpacity
        key={item.product_id}
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate("Productdetail", { id: item.product_id })
        }
      >
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item?.product_name}</Text>
          <Text style={styles.itemDetails}>325ml, Price</Text>
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>₹ {item.price}</Text>
            {item.product_total_qty <= 0 ? (
              <View style={styles.outOfStock}>
                <Text style={styles.outOfStockText}>Out Of Stock</Text>
              </View>
            ) : cartItem.some(
                (cartItem) => cartItem.product_id === item.product_id
              ) ? (
              <View style={styles.cartControls}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => decreaseCartQuantity(item.product_id)}
                >
                  <Entypo name="minus" size={20} color="#bab7b6" />
                </TouchableOpacity>
                <Text style={styles.cartQuantity}>
                  {
                    cartItem.find(
                      (cartItem) => cartItem.product_id === item.product_id
                    )?.qty
                  }
                </Text>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => {
                    const response = checkProductQuantity(item, cartItem);
                    if (response) {
                      increaseCartQuantity(item?.product_id);
                    } else {
                      showAlert(item.product_id);
                    }
                  }}
                >
                  <Entypo name="plus" size={20} color="#69AF5D" />
                </TouchableOpacity>
                {isAlertVisible && (
                  <CustomAlert
                    visible={isAlertVisible}
                    title="Out of Stock"
                    productName={`${item?.product_name}`}
                    productQty={`${item?.product_total_qty}`}
                    onClose={() => closeAlert(item.product_id)}
                  />
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addingItemInCart(item)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="rgb(255,255,255)" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBody}>
            <Icon name="search" size={25} color="rgba(0, 0, 0, 0.459);" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search store"
              onChangeText={handleInputChange}
              value={text}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
            <Image
              source={require("../../assets/Group 6839.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
        {text === "" ? (
          <ScrollView><Category /></ScrollView>
        ) : (
          <FlatList
            data={filterData}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Product Not Found</Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchContainer: {
    padding: 10,
    width: "95%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  searchBody: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgb(242,243,242)",
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 35,
    marginLeft: 10,
    fontWeight: "bold",
  },
  filterIcon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  itemContainer: {
    width: "45%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0ebeb",
    margin: 5,
    height:248
  },
  itemImage: {
    width: "100%",
    height: 110,
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Gilroy-Bold",
  },
  itemDetails: {
    fontSize: 14,
    color: "rgb(205,205,205)",
    fontFamily: "Gilroy-Semibold",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "Gilroy-Semibold",
  },
  outOfStock: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  outOfStockText: {
    color: "red",
    fontWeight: "500",
  },
  cartControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  cartButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bab7b6",
    borderRadius: 5,
  },
  cartQuantity: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#69AF5D",
    borderRadius: 15,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  columnWrapper: {
    justifyContent: "center",
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 200,
  },
  emptyText: {
    fontWeight: "semibold",
    fontSize: 20,
    fontFamily: "serif",
    textDecorationLine: "underline",
  },
});
