// import { useState, useEffect } from "react";
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Entypo } from "@expo/vector-icons";
// import { Rating } from "react-native-ratings";
// import Swiper from "react-native-swiper";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import {
//   addFavouriteItem,
//   addProductRating,
//   loadFavItem,
//   supabase,
// } from "./supabaseClient";
// import { addToFavFun } from "../../lib/cartFun";
// import { useMyContext } from "../context/Context";
// import { checkProductQuantity, CustomAlert } from "../utils/CheckQuantity";
// import { imageUrl } from "../../lib/constant";

// const Productdetail = ({ route }) => {
//   const productId = route.params.id;
//   const navigation = useNavigation();

//   const [detailsExpanded, setDetailsExpanded] = useState(false);
//   const [nutritionExpanded, setNutritionExpanded] = useState(false);
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [fetchProduct, setFetchProduct] = useState([]);
//   const [isProductPresent, setIsProduct] = useState(false);
//   const [heartIconColor, setHeartIconColor] = useState("black");
//   const [imageLoading, setImageLoading] = useState(true);
//   const [isAlertVisible, setIsAlertVisible] = useState(false);

//   const {
//     cartItem,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//     addingItemInCart,
//     addFavouriteItemList,
//     favouriteItem,
//   } = useMyContext();

//   const toggleDetails = () => {
//     setDetailsExpanded(!detailsExpanded);
//     setNutritionExpanded(false);
//   };

//   const toggleNutrition = () => {
//     setNutritionExpanded(!nutritionExpanded);
//     setDetailsExpanded(false);
//   };

//   const addToCart = (item) => {
//     addingItemInCart(item);
//   };

//   const checkProductPresentInCartOrNot = cartItem?.some(item => item?.product_id === fetchProduct[0]?.product_id);
//   const textData = checkProductPresentInCartOrNot ? "Go To Basket" : "Add To Cart";

//   const isFavItemOrNot = favouriteItem?.some(item => item?.product_id === fetchProduct[0]?.product_id);
//   const isFavItem = isFavItemOrNot;

//   const addToFav = async (data) => {
//     const userId = await AsyncStorage.getItem("userMobileNumber");
//     const { price, product_id, imagename, product_name, darkroomownerid } = data;
    
//     await addFavouriteItem(price, product_id, imagename, product_name, darkroomownerid, userId);
//     const response = await loadFavItem(userId);
//     addFavouriteItemList(response);
//     setHeartIconColor("red");
//   };

//   const loadFav = async () => {
//     const userId = await AsyncStorage.getItem("userMobileNumber");
//     const response = await loadFavItem(userId);
//     addFavouriteItemList(response);
//     setImageLoading(false);
//   };

//   const ratingCompleted = (rating) => {
//     addProductRating(fetchProduct, rating);
//   };

//   const fetchData = async () => {
//     const resp = await supabase.from("newproducts").select("*").eq("product_id", productId);
//     setFetchProduct(resp.data);
//   };

//   const showAlert = () => setIsAlertVisible(true);
//   const closeAlert = () => setIsAlertVisible(false);

//   useEffect(() => {
//     fetchData();
//   }, [productId]);

//   useEffect(() => {
//     loadFav();
//     setImageLoading(false);
//   }, []);

//   return (
//     <>
//       <StatusBar backgroundColor="white" barStyle="dark-content" />
//       <View style={styles.container}>
//         {fetchProduct.length > 0 ? (
//           fetchProduct.map((item, index) => (
//             <React.Fragment key={index}>
//               <View style={styles.imageContainer}>
//                 <Swiper
//                   activeDotColor="rgb(105,175,94)"
//                   activeDotStyle={styles.activeDot}
//                   dotColor="rgb(181,178,177)"
//                 >
//                   {imageLoading ? (
//                     <View style={styles.loaderContainer}>
//                       <ActivityIndicator size="large" color="rgb(105,175,94)" />
//                     </View>
//                   ) : (
//                     item?.imagename?.map((img, imgIndex) => (
//                       <Image
//                         key={img?.imgid}
//                         source={{ uri: `${imageUrl}${img?.name}` }}
//                         onLoad={() => setImageLoading(false)}
//                         style={styles.image}
//                       />
//                     ))
//                   )}
//                 </Swiper>
//               </View>

//               <View style={styles.detailsContainer}>
//                 <View style={styles.header}>
//                   <Text style={styles.productName}>{item.product_name}</Text>
//                   <Entypo
//                     name="heart-outlined"
//                     size={24}
//                     color={isFavItem ? "red" : "black"}
//                     onPress={() => isFavItem ? navigation.navigate("Favourite") : addToFav(item)}
//                   />
//                 </View>

//                 <Text style={styles.productDetails}>1Kg, price</Text>

//                 <View style={styles.quantityContainer}>
//                   {item?.product_total_qty === 0 ? (
//                     <View style={styles.outOfStock}>
//                       <Text style={styles.outOfStockText}>Out Of Stock</Text>
//                     </View>
//                   ) : cartItem.some(cartItem => cartItem?.product_id === item?.product_id) ? (
//                     <View style={styles.quantityControls}>
//                       <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseCartQuantity(item?.product_id)}>
//                         <Text style={styles.quantityButtonText}><Entypo name="minus" size={20} /></Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.quantityButton}>
//                         <Text style={styles.quantityText}>{cartItem.find(cartItem => cartItem?.product_id === item?.product_id)?.qty}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => {
//                           const response = checkProductQuantity(item, cartItem);
//                           response ? increaseCartQuantity(item?.product_id) : showAlert();
//                         }}
//                       >
//                         <Text style={styles.quantityButtonText}><Entypo name="plus" size={20} color="#69AF5D" /></Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <TouchableOpacity style={styles.addButton} onPress={() => addingItemInCart(item)}>
//                       <Text style={styles.addButtonText}>+</Text>
//                     </TouchableOpacity>
//                   )}

//                   <View style={styles.priceContainer}>
//                     <Text style={styles.productPrice}>₹ {item?.price}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.reviewContainer}>
//                   <Text style={styles.reviewTitle}>Product Details</Text>
//                   <TouchableOpacity onPress={toggleDetails} style={styles.toggleButton}>
//                     <Entypo name={detailsExpanded ? "chevron-small-up" : "chevron-small-down"} size={24} color="black" />
//                   </TouchableOpacity>
//                 </View>
//                 {detailsExpanded && <Text style={styles.detailsText}>{item?.product_details}</Text>}

//                 <View style={styles.reviewContainer}>
//                   <Text style={styles.reviewTitle}>Nutritions</Text>
//                   <TouchableOpacity onPress={toggleNutrition} style={styles.toggleButton}>
//                     <Entypo name={nutritionExpanded ? "chevron-small-up" : "chevron-small-down"} size={24} color="black" />
//                   </TouchableOpacity>
//                 </View>
//                 {nutritionExpanded && <Text style={styles.detailsText}>Total Fat 0.2 g, Cholesterol 0 mg 0%, Sodium 1 mg 0%, Potassium 107 mg</Text>}

//                 <View style={styles.ratingContainer}>
//                   <Text style={styles.reviewTitle}>Review</Text>
//                   <Rating
//                     onFinishRating={ratingCompleted}
//                     imageSize={25}
//                     style={styles.rating}
//                   />
//                   <Image source={require("../../assets/Vector.png")} style={styles.reviewImage} />
//                 </View>

//                 <TouchableOpacity
//                   style={styles.addToCartButton}
//                   onPress={() => textData === "Go To Basket" ? navigation.navigate("Cart") : addToCart(item)}
//                 >
//                   <Text style={styles.addToCartButtonText}>{textData}</Text>
//                 </TouchableOpacity>
//               </View>
//             </React.Fragment>
//           ))
//         ) : (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size={50} color="rgb(105,175,94)" />
//           </View>
//         )}

//         {isAlertVisible && (
//           <CustomAlert
//             visible={isAlertVisible}
//             title="Out of Stock"
//             productName={fetchProduct[0]?.product_name}
//             productQty={fetchProduct[0]?.product_total_qty}
//             onClose={closeAlert}
//           />
//         )}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 5,
//   },
//   imageContainer: {
//     height: "50%",
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 2,
//   },
//   activeDot: {
//     width: 30,
//   },
//   loaderContainer: {
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "50%",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   detailsContainer: {
//     padding: 20,
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 5,
//   },
//   productName: {
//     fontSize: 24,
//     width: 300,
//     fontFamily: "Gilroy-Bold",
//   },
//   productDetails: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#b5b2b1",
//     width:"100%",
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "98%",
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   outOfStock: {
//     backgroundColor: "#E3E3E3",
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//     borderRadius: 5,
//   },
//   outOfStockText: {
//     color: "red",
//     fontWeight: "500",
//   },
//   quantityControls: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 2,
//   },
//   quantityButton: {
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: "#bab7b6",
//     borderRadius: 5,
//   },
//   quantityButtonText: {
//     color: "#bab7b6",
//   },
//   quantityText: {
//     fontSize: 20,
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#69AF5D",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   addButtonText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   priceContainer: {
//     width: "60%",
//     alignItems: "flex-end",
//   },
//   productPrice: {
//     fontSize: 18,
//     fontFamily: "Gilroy-Bold",
//   },
//   reviewContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 2,
//   },
//   reviewTitle: {
//     fontSize: 16,
//     fontFamily: "Gilroy-Semibold",
//     flex: 1,
//   },
//   toggleButton: {
//     justifyContent: "center",
//   },
//   detailsText: {
//     color: "#616362",
//     fontFamily: "Gilroy-Medium",
//     fontSize: 13,
//     width: "100%",
//     textAlign: "left",
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   rating: {
//     paddingVertical: 0,
//     backgroundColor: "transparent",
//   },
//   reviewImage: {
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   addToCartButton: {
//     backgroundColor: "#69AF5D",
//     width: "100%",
//     height: 65,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//     marginTop: 35,
//     marginBottom: 50,
//   },
//   addToCartButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Productdetail;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  addFavouriteItem,
  addProductRating,
  loadFavItem,
  supabase,
} from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { checkProductQuantity, CustomAlert } from "../utils/CheckQuantity";
import { imageUrl } from "../../lib/constant";

const Productdetail = ({ route }:any) => {
  const productId = route.params.id;
  const navigation = useNavigation();

  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [fetchProduct, setFetchProduct] = useState([]);
  const [isProductPresent, setIsProduct] = useState(false);
  const [heartIconColor, setHeartIconColor] = useState("black");
  const [imageLoading, setImageLoading] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {
    cartItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    addingItemInCart,
    addFavouriteItemList,
    favouriteItem,
  } = useMyContext();

  const toggleDetails = () => {
    setDetailsExpanded(!detailsExpanded);
    setNutritionExpanded(false);
  };

  const toggleNutrition = () => {
    setNutritionExpanded(!nutritionExpanded);
    setDetailsExpanded(false);
  };

  const addToCart = (item:any) => {
    addingItemInCart(item);
  };

  const checkProductPresentInCartOrNot = cartItem?.some(
    (item) => item?.product_id === fetchProduct[0]?.product_id
  );
  const textData = checkProductPresentInCartOrNot ? "Go To Basket" : "Add To Cart";

  const isFavItemOrNot = favouriteItem?.some(
    (item) => item?.product_id === fetchProduct[0]?.product_id
  );
  const isFavItem = isFavItemOrNot;

  const addToFav = async (data) => {
    const userId = await AsyncStorage.getItem("userMobileNumber");
    const { price, product_id, imagename, product_name, darkroomownerid } = data;

    await addFavouriteItem(
      price,
      product_id,
      imagename,
      product_name,
      darkroomownerid,
      userId
    );
    const response = await loadFavItem(userId);
    addFavouriteItemList(response);
    setHeartIconColor("red");
  };

  const loadFav = async () => {
    const userId = await AsyncStorage.getItem("userMobileNumber");
    const response = await loadFavItem(userId);
    addFavouriteItemList(response);
    setImageLoading(false);
  };

  const ratingCompleted = (rating) => {
    addProductRating(fetchProduct, rating);
  };

  const fetchData = async () => {
    const resp = await supabase
      .from("newproducts")
      .select("*")
      .eq("product_id", productId);
    setFetchProduct(resp.data);
  };

  const showAlert = () => setIsAlertVisible(true);
  const closeAlert = () => setIsAlertVisible(false);

  useEffect(() => {
    fetchData();
  }, [productId]);

  useEffect(() => {
    loadFav();
    setImageLoading(false);
  }, []);

  if (fetchProduct.length === 0) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size={50} color="rgb(105,175,94)" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{minHeight:"100%"}}>
      <View style={styles.container}>
        {fetchProduct.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.imageContainer}>
              <Swiper
                activeDotColor="rgb(105,175,94)"
                activeDotStyle={styles.activeDot}
                dotColor="rgb(181,178,177)"
              >
                {imageLoading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator
                      size="large"
                      color="rgb(105,175,94)"
                      style={{ height: "100%" }}
                    />
                  </View>
                ) : (
                  item?.imagename?.map((img, imgIndex) => (
                    <Image
                      key={img?.imgid}
                      source={{ uri: `${imageUrl}${img?.name}` }}
                      onLoad={() => setImageLoading(false)}
                      style={styles.image}
                    />
                  ))
                )}
              </Swiper>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.header}>
                <Text style={styles.productName}>{item?.product_name}</Text>
                <Entypo
                  name="heart-outlined"
                  size={24}
                  color={isFavItem ? "red" : "black"}
                  onPress={() =>
                    isFavItem
                      ? navigation.navigate("Favourite")
                      : addToFav(item)
                  }
                />
              </View>

              <Text style={styles.productDetails}>1Kg, price</Text>

              <View style={styles.quantityContainer}>
                {item?.product_total_qty === 0 ? (
                  <View style={styles.outOfStock}>
                    <Text style={styles.outOfStockText}>Out Of Stock</Text>
                  </View>
                ) : cartItem.some(
                    (cartItem) => cartItem?.product_id === item?.product_id
                  ) ? (
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        decreaseCartQuantity(item?.product_id)
                      }
                    >
                      <Text style={styles.quantityButtonText}>
                        <Entypo name="minus" size={20} />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityText}>
                        {
                          cartItem?.find(
                            (cartItem) =>
                              cartItem?.product_id === item?.product_id
                          )?.qty
                        }
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        const response = checkProductQuantity(item, cartItem);
                        response
                          ? increaseCartQuantity(item?.product_id)
                          : showAlert();
                      }}
                    >
                      <Text style={styles.quantityButtonText}>
                        <Entypo name="plus" size={20} color="#69AF5D" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addingItemInCart(item)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>₹ {item?.price}</Text>
                </View>
              </View>

              <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Product Details</Text>
                <TouchableOpacity
                  onPress={toggleDetails}
                  style={styles.toggleButton}
                >
                  <Entypo
                    name={detailsExpanded ? "chevron-small-up" : "chevron-small-down"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {detailsExpanded && (
                <Text style={styles.detailsText}>{item?.product_details}</Text>
              )}

              <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Nutritions</Text>
                <TouchableOpacity
                  onPress={toggleNutrition}
                  style={styles.toggleButton}
                >
                  <Entypo
                    name={nutritionExpanded ? "chevron-small-up" : "chevron-small-down"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {nutritionExpanded && (
                <Text style={styles.detailsText}>
                  Total Fat 0.2 g, Cholesterol 0 mg 0%, Sodium 1 mg 0%, Potassium
                  107 mg
                </Text>
              )}

              <View style={styles.ratingContainer}>
                <Text style={styles.reviewTitle}>Review</Text>
                <Rating
                  onFinishRating={ratingCompleted}
                  imageSize={25}
                  style={styles.rating}
                />
                <Image
                  source={require("../../assets/Vector.png")}
                  style={styles.reviewImage}
                />
              </View>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() =>
                  textData === "Go To Basket"
                    ? navigation.navigate("Cart")
                    : addToCart(item)
                }
              >
                <Text style={styles.addToCartButtonText}>{textData}</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </View>
      </View>

      {isAlertVisible && (
        <CustomAlert
          visible={isAlertVisible}
          title="Out of Stock"
          productName={fetchProduct[0]?.product_name}
          productQty={fetchProduct[0]?.product_total_qty}
          onClose={closeAlert}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom:100,
    backgroundColor:"#fff"
  },
  imageContainer: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  activeDot: {
    width: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "95%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    maxWidth: "70%",
    fontFamily: "Gilroy-Bold",
  },
  productDetails: {
    fontSize: 16,
    fontWeight: "500",
    color: "#b5b2b1",
    width: "100%",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  outOfStock: {
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  outOfStockText: {
    color: "red",
    fontWeight: "500",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  quantityButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bab7b6",
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#bab7b6",
  },
  quantityText: {
    fontSize: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#69AF5D",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  priceContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "Gilroy-Bold",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 2,
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
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  rating: {
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  reviewImage: {
    marginLeft: 10,
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "#69AF5D",
    width: "100%",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 35,
    marginBottom: 50,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Productdetail;

