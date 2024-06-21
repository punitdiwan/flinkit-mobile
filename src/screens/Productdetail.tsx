import { useState, useEffect } from "react";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
// import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { addFavouriteItem, addProductRating, loadFavItem, supabase } from "./supabaseClient";
import { CiHeart } from "react-icons/ci";
import { addToFavFun } from "../../lib/cartFun";
import { useMyContext } from "../context/Context";
import { AirbnbRating, Rating } from "react-native-ratings"


const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};

const Productdetail = (id: any) => {
  console.log("product_id", id.route.params.id);
  //  const dispatch = useDispatch();

  const productId = id.route.params.id;
  const navigation = useNavigation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [fetchProduct, setFetchProduct] = useState<any>([]);
  const [isProductPresent, setIsProduct] = useState(false);

  const fetchData = async () => {
    console.log("working");
    // console.log("category_id:", id.route.params.id);
    const resp: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("product_id", productId);
    // console.log("product-details", resp.data);

    setFetchProduct(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  const toggleDetails = () => {
    setDetailsExpanded(!detailsExpanded);
    setNutritionExpanded(false); // Close nutrition section
  };

  const toggleNutrition = () => {
    setNutritionExpanded(!nutritionExpanded);
    setDetailsExpanded(false); // Close details section
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const setFavItem = async (item:any) => {
  //    await addToFavFun(item);
  //    await dispatch(clearFavItemList());
  //    const response = await loadFavItem();
  //    await dispatch(addFavItem(response));
  // }

  const { cartItem, increaseCartQuantity, decreaseCartQuantity, addingItemInCart, addFavouriteItemList, favouriteItem } = useMyContext();

  const addToCart = (item: any) => {
    addingItemInCart(item);
  }

  const checkProductPresentInCartOrNot = cartItem?.length > 0 && cartItem?.filter(item => item?.product_id == fetchProduct[0]?.product_id);
  const textData = checkProductPresentInCartOrNot?.length > 0 ? "Go To Basket" : "Add To Cart";


  const isFavItemOrNot = favouriteItem?.length > 0 && favouriteItem.filter(item => item?.product_id == fetchProduct[0]?.product_id);
  const isFavItem = isFavItemOrNot?.length > 0 ? true : false;

  const addToFav = async (data) => {
    // console.log("fav", data);
    const { price, product_id, product_imagename, product_name } = data;
    await addFavouriteItem(price, product_id, product_imagename, product_name);
    const response = await loadFavItem();
    addFavouriteItemList(response);

  }

  const loadFav = async () => {
    const response = await loadFavItem();
    // setFavouriteItem(response);
    addFavouriteItemList(response);
  }

  const ratingCompleted = (rating) => {
      addProductRating(fetchProduct,rating);
  }

  useEffect(() => {
    loadFav();
  }, [])


  return (
    <>
      <View style={styles.container}>
        {fetchProduct.length > 0 ? fetchProduct?.map((item: any, index: number) => {
          return (
            <>
              <View
                style={{
                  height: "50%",
                  width: "100%",

                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.product_imagename }}
                  style={styles.image}
                />
              </View>

              <View style={styles.detailsContainer}>
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 24, fontFamily: "Gilroy-Bold" }}>
                    {item.product_name}
                  </Text>
                  {isFavItem ? <Text>
                    <Entypo name="heart-outlined" size={24} color={"red"} onPress={() => navigation.navigate("Favourite")} />
                  </Text> : <Text>
                    <Entypo name="heart-outlined" size={24} onPress={() => addToFav(item)} />
                  </Text>}
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={{ fontSize: 15, fontWeight: "500", color: "#b5b2b1" }}>1Kg, price</Text>
                </View>

                <View style={styles.quantityContainer}>

                  {cartItem.filter(itemm => itemm.product_id == item.product_id).length > 0 ? <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 2 }}>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}
                      onPress={() => decreaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{ color: "#bab7b6" }}>
                        <Entypo name="minus" size={20} />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}>
                      <Text style={{ fontSize: 20 }}>
                        {cartItem.filter(itemm => itemm.product_id == item.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}
                      onPress={() => increaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{ fontSize: 20, color: "#69AF5D" }}>
                        <Entypo name="plus" size={20} />
                      </Text>
                    </TouchableOpacity>
                  </View> : <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#69AF5D",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "white",
                        // backgroundColor:"red",

                      }}
                      onPress={() => addingItemInCart(item)}
                    >
                      +
                    </Text>
                  </TouchableOpacity>

                  }

                  <View
                    style={{
                      width: "60%",

                      alignItems: "flex-end",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,

                        fontFamily: "Gilroy-Bold",
                      }}
                    >
                      ₹ {item.price}
                    </Text>
                  </View>
                </View>

                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewTitle}>Product Details</Text>
                  <TouchableOpacity
                    onPress={toggleDetails}
                    style={styles.toggleButton}
                  >
                    <Entypo
                      name={
                        detailsExpanded
                          ? "chevron-small-up"
                          : "chevron-small-down"
                      }
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {detailsExpanded && (
                  <Text style={styles.detailsText}>{item.product_details}</Text>
                )}

                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewTitle}>Nutritions</Text>
                  <TouchableOpacity
                    onPress={toggleNutrition}
                    style={styles.toggleButton}
                  >
                    <Entypo
                      name={
                        nutritionExpanded
                          ? "chevron-small-up"
                          : "chevron-small-down"
                      }
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                {nutritionExpanded && (
                  <Text style={styles.detailsText}>
                    Total Fat 0.2 g, Cholesterol 0 mg 0%, Sodium 1 mg 0%,
                    Potassium 107 mg
                  </Text>
                )}
           
                <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                  <Text style={styles.reviewTitle}>Review</Text>
                  <View>
                    {/* <AirbnbRating size={10} reviewSize={0} reviews={[]} /> */}
                    <Rating
                      onFinishRating={ratingCompleted}
                      imageSize={25}
                      style={{ paddingVertical: 0,backgroundColor:"transparent" }}
                    />
                  </View>
                  <Image
                    source={require("../../assets/Vector.png")}
                    style={styles.reviewImage}
                  />
                </View>

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => {

                    if (textData == "Go To Basket") {
                      navigation.navigate("Cart")
                    } else {
                      addToCart(item)
                    }
                  }}
                >
                  <Text style={styles.addToCartButtonText}>{textData}</Text>
                </TouchableOpacity>
              </View >
            </>
          );
        }) : <View style={{justifyContent:"center",alignItems:'center',paddingTop:300}}><ActivityIndicator size={50} color={"rgb(105,175,94)"}/></View>}
      </View >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "80%",
    height: "40%",
    justifyContent: "flex-end",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 1,
  },
  image: {
    marginTop: 30,
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontFamily: "Gilroy-Bold",
    marginTop: 15,
    marginRight: 80,
    textAlign: "center",
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "98%",
    marginVertical: 10,
    marginHorizontal: "1%",
    // backgroundColor:"red",
    paddingHorizontal: 10
  },

  quantityText: {
    fontSize: 18,
    fontFamily: "Gilroy-Medium",
  },
  productPrice: {
    fontSize: 15,
    fontFamily: "Gilroy-Semibold",
    marginBottom: 8,
    textAlign: "center",
    marginRight: 250,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    width: "100%",
    marginVertical:2
  },
  reviewTitle: {
    fontSize: 16,
    fontFamily: "Gilroy-Semibold",
    flex: 1,
  },
  toggleButton: {
    justifyContent: "center",
  },
  detailsText: {
    color: "#616362",
    fontFamily: "Gilroy-Medium",
    fontSize: 13,
    width: "100%",
    textAlign: "left",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  reviewImage: {
    marginLeft: 10,
    marginTop:5
  },
  addToCartButton: {
    backgroundColor: "#69AF5D",
    width: "100%",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 35,
    marginBottom: 30,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  fillView: {
    position: 'absolute',
    width: 10,
    height: 10,
    top: 20,
    left: 50,
    backgroundColor: "yellow"
  }
});

export default Productdetail;
