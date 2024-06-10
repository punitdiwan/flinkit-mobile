import { useState, useEffect } from "react";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { addFavouriteItem, supabase } from "./supabaseClient";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addFavItem } from "../../redux/slices/favItemSlice";

const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};

const Productdetail = (id: any) => {
  console.log("product_id", id.route.params.id);
 const dispatch = useDispatch();

  const productId = id.route.params.id;
  const navigation = useNavigation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [fetchProduct, setFetchProduct] = useState<any>([]);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  const fetchData = async () => {
    console.log("working");
    console.log("category_id:", id.route.params.id);
    const resp: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("product_id", productId);
    console.log("product-details", resp.data);

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

  const setFavItem = async () => {
      const response = await addFavouriteItem(3,"green apple",60);
      console.log("setFav",response);
      
      if(response !== undefined){
        dispatch(addFavItem(response));
      }
  }

  return (
    <>
      <View style={styles.container}>
        {/* <ImageBackground
        source={require("../../assets/productdetailback.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      > */}
        {fetchProduct?.map((item: any, index: number) => {
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
                  <Text onPress={() => setFavItem()}>
                  {/* import { CiHeart } from "react-icons/ci"; */}
                  Fav
                  </Text>
                </View>

                <Text style={styles.productPrice}>1Kg, price</Text>
                <View style={styles.quantityContainer}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      width: "35%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={decreaseQuantity}>
                      <Entypo name="minus" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity}>
                      <Entypo name="plus" size={24} color="#53B175" />
                    </TouchableOpacity>
                  </View>
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

                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewTitle}>Review</Text>
                  <View style={styles.starsContainer}>
                    <Feather name="star" size={18} color="black" />
                    <Feather name="star" size={18} color="black" />
                    <Feather name="star" size={18} color="black" />
                    <Feather name="star" size={18} color="black" />
                    <Feather name="star" size={18} color="black" />
                  </View>
                  <Image
                    source={require("../../assets/Vector.png")}
                    style={styles.reviewImage}
                  />
                </View>

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => navigation.navigate("Onboarding")}
                >
                  <Text style={styles.addToCartButtonText}>Add to Basket</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        })}

        {/* </ImageBackground> */}
      </View>
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
    marginBottom: 10,
    width: "100%",
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
  },
  addToCartButton: {
    backgroundColor: "#69AF5D",
    width: 300,
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
});

export default Productdetail;
