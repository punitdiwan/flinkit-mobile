// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { getProductsRelatedToCategoryId } from "./supabaseClient";
// import { useMyContext } from "../context/Context";
// import { Entypo, AntDesign } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { imageUrl } from "../../lib/constant";
// import { checkProductQuantity, CustomAlert } from "../utils/CheckQuantity";

// interface ShowingFilterDataProps {
//   id: number;
//   category: string;
//   brand: string;
// }

// const { width, height } = Dimensions.get('window');

// const ShowingFilterData: React.FC<ShowingFilterDataProps> = () => {
//   const route = useRoute();
//   const { id, category, brand } = route.params;
//   const [products, setProducts] = useState([]);
//   const navigation = useNavigation();
//   const {
//     cartItem,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//     addingItemInCart,
//   } = useMyContext();

//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const showAlert = (product) => {
//     setSelectedProduct(product);
//     setIsAlertVisible(true);
//   };

//   const closeAlert = () => {
//     setIsAlertVisible(false);
//     setSelectedProduct(null);
//   };

//   const getAllProducts = async (categoryId: any) => {
//     const response = await getProductsRelatedToCategoryId(categoryId);
//     let filterProductsOnBrand = response;
//     if (brand) {
//       filterProductsOnBrand = response?.filter(
//         (item) => item?.product_brand?.toLowerCase() == brand.toLowerCase()
//       );
//     }
//     setProducts(filterProductsOnBrand);
//   };

//   useEffect(() => {
//     getAllProducts(id);
//   }, [category, brand]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <AntDesign
//           name="arrowleft"
//           size={24}
//           style={styles.backButton}
//           onPress={() => navigation.navigate("Filter")}
//         />
//         <Text style={styles.headerTitle}>Filter</Text>
//       </View>
//       {products.length === 0 ? (
//         <View style={styles.noProducts}>
//           <Text style={styles.noProductsText}>No Products Found</Text>
//         </View>
//       ) : (
//         <View style={styles.productsContainer}>
//           {products.map((item) => (
//             <View key={item?.product_id} style={styles.productCard}>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("Productdetail", {
//                     id: item?.product_id,
//                   })
//                 }
//               >
//                 <View>
//                   <Image
//                     style={styles.productImage}
//                     resizeMode="contain"
//                     source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }}
//                   />
//                   <View style={styles.productNameContainer}>
//                     <Text style={styles.productName}>{item?.product_name}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.productFooter}>
//                   <View>
//                     <Text style={styles.productPrice}>₹{item?.price}</Text>
//                   </View>
//                   {item?.product_total_qty === 0 ? (
//                     <View style={styles.outOfStock}>
//                       <Text style={styles.outOfStockText}>Out Of Stock</Text>
//                     </View>
//                   ) : cartItem.filter(
//                       (itemm) => itemm?.product_id === item?.product_id
//                     ).length > 0 ? (
//                     <View style={styles.quantityControls}>
//                       <TouchableOpacity
//                         style={styles.controlButton}
//                         onPress={() => decreaseCartQuantity(item?.product_id)}
//                       >
//                         <Text style={styles.controlButtonText}>
//                           <Entypo name="minus" size={20} />
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.controlButton}>
//                         <Text style={styles.quantityText}>
//                           {
//                             cartItem.filter(
//                               (itemm) => itemm?.product_id === item?.product_id
//                             )?.[0]?.qty
//                           }
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         style={styles.controlButton}
//                         onPress={() => {
//                           const response = checkProductQuantity(
//                             item,
//                             cartItem
//                           );
//                           if (response) {
//                             increaseCartQuantity(item?.product_id);
//                           } else {
//                             showAlert(item);
//                           }
//                         }}
//                       >
//                         <Entypo
//                           name="plus"
//                           style={styles.controlButtonPlus}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <TouchableOpacity
//                       style={styles.addButton}
//                       onPress={() => addingItemInCart(item)}
//                     >
//                       <Text style={styles.addButtonText}>+</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </TouchableOpacity>
//               {isAlertVisible && selectedProduct === item && (
//                 <CustomAlert
//                   visible={isAlertVisible}
//                   title="Out of Stock"
//                   productName={`${item?.product_name}`}
//                   productQty={`${item?.product_total_qty}`}
//                   onClose={closeAlert}
//                 />
//               )}
//             </View>
//           ))}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     height: 50,
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   backButton: {
//     fontWeight: "bold",
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "500",
//   },
//   noProducts: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   noProductsText: {
//     fontSize: 20,
//     fontWeight: "400",
//     textDecorationLine: "underline",
//   },
//   productsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     paddingHorizontal: 3,
//     gap:5
//   },
//   productCard: {
//     backgroundColor: "white",
//     // marginVertical: 5,
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "rgb(233,233,233)",
//     elevation: 1,
//     width: width * 0.45, // Adjust width relative to screen size
//     height: 260,
//   },
//   productImage: {
//     width: "100%",
//     height: 110,
//   },
//   productNameContainer: {
//     height: 40,
//   },
//   productName: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   productFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//     alignItems: "center",
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   outOfStock: {
//     backgroundColor: "#f0f0f0",
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
//   },
//   controlButton: {
//     width: 30,
//     height: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: "#bab7b6",
//     borderRadius: 5,
//     borderWidth: 1,
//     marginHorizontal: 2,
//   },
//   controlButtonText: {
//     color: "#bab7b6",
//   },
//   quantityText: {
//     fontSize: 20,
//   },
//   controlButtonPlus: {
//     fontSize: 20,
//     color: "#69AF5D",
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
//     color: "white",
//   },
// });

// export default ShowingFilterData;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getProductsRelatedToCategoryId } from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageUrl } from "../../lib/constant";
import { checkProductQuantity, CustomAlert } from "../utils/CheckQuantity";

const { width } = Dimensions.get('window');

const ShowingFilterData = () => {
  const route = useRoute();
  const { id, category, brand } = route?.params;
  const navigation = useNavigation();
  const { cartItem, increaseCartQuantity, decreaseCartQuantity, addingItemInCart } = useMyContext();

  const [products, setProducts] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (categoryId) => {
    const response = await getProductsRelatedToCategoryId(categoryId);
    const filteredProducts = brand
      ? response.filter(item => item?.product_brand?.toLowerCase() === brand.toLowerCase())
      : response;
    setProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts(id);
  }, [category, brand]);

  const handleProductPress = (productId:any) => {
    navigation.navigate("Productdetail", { id: productId });
  };

  const handleQuantityChange = (product:any) => {
    const isAvailable = checkProductQuantity(product, cartItem);
    if (isAvailable) {
      increaseCartQuantity(product?.product_id) ;
    } else {
      setSelectedProduct(product);
      setIsAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
    setSelectedProduct(null);
  };

  const renderProductCard = (item:any) => (
    <View key={item?.product_id} style={styles.productCard}>
      <TouchableOpacity onPress={() => handleProductPress(item?.product_id)}>
        <Image style={styles.productImage} resizeMode="contain" source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }} />
        <View style={styles.productNameContainer}>
          <Text style={styles.productName}>{item?.product_name}</Text>
        </View>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>₹{item?.price}</Text>
          {item?.product_total_qty === 0 ? (
            <View style={styles.outOfStock}><Text style={styles.outOfStockText}>Out Of Stock</Text></View>
          ) : cartItem.some(cartItem => cartItem?.product_id === item?.product_id) ? (
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => decreaseCartQuantity(item?.product_id)}>
                <Entypo name="minus" size={20} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {cartItem.find(cartItem => cartItem?.product_id === item?.product_id)?.qty || 0}
              </Text>
              <TouchableOpacity style={styles.controlButton} onPress={() => handleQuantityChange(item)}>
                <Entypo name="plus" style={styles.controlButtonPlus} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={() => addingItemInCart(item)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {isAlertVisible && selectedProduct === item && (
        <CustomAlert
          visible={isAlertVisible}
          title="Out of Stock"
          productName={item?.product_name}
          productQty={item?.product_total_qty}
          onClose={closeAlert}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} style={styles.backButton} onPress={() => navigation.navigate("Filter")} />
        <Text style={styles.headerTitle}>Filter</Text>
      </View>
      {products.length === 0 ? (
        <View style={styles.noProducts}>
          <Text style={styles.noProductsText}>No Products Found</Text>
        </View>
      ) : (
        <View style={styles.productsContainer}>
          {products?.map(renderProductCard)}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    fontWeight: "bold",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 20,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    paddingHorizontal: 3,
    gap: 5,
  },
  productCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(233,233,233)",
    elevation: 1,
    width: width * 0.45,
    height: 260,
    margin: 5,
  },
  productImage: {
    width: "100%",
    height: 110,
  },
  productNameContainer: {
    height: 40,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },
  outOfStock: {
    backgroundColor: "#f0f0f0",
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
  },
  controlButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#bab7b6",
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 2,
  },
  controlButtonText: {
    color: "#bab7b6",
  },
  quantityText: {
    fontSize: 20,
  },
  controlButtonPlus: {
    fontSize: 20,
    color: "#69AF5D",
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
    color: "white",
  },
});

export default ShowingFilterData;

