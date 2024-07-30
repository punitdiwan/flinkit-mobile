//

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useMyContext } from "../context/Context";
import { imageUrl } from "../../lib/constant";
import { CustomAlert } from "../utils/CheckQuantity";
import {
  getCurrentQuantityOfProducts,
  getCurrentQuantityOfProductsRelatedToId,
} from "../screens/supabaseClient";
import { useIsFocused } from "@react-navigation/native";

type CartItemProps = {
  item: {
    product_id: number;
    product_name: string;
    price: number;
    imagename: string[];
    qty: number;
  };
};

const CartItemCard = ({ item }: CartItemProps) => {
  const focused = useIsFocused();
  const {cartItem} = useMyContext();

  // checking product name if it contains more then 20 character the we slice the name and showing limited character of product name
  const moreCharacter = item?.product_name.length > 20;
  const productName = moreCharacter ? item?.product_name.slice(0,20) : item?.product_name;

  const [currentProductQuantity, setCurrentProductQuantity] = useState([]);


  // context state and function to set state
  const {
    deleteParticularItemInCart,
    decreaseCartQuantity,
    increaseCartQuantity,
  } = useMyContext();

  // extracting data from item
  const { product_name, price, imagename, qty, product_id } = item;

  // maintaing state of alert
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const showAlert = () => setIsAlertVisible(true);
  const closeAlert = () => setIsAlertVisible(false);

  // handling Add to cart 
  const handleAddToCart = () => {
    const response = qty + 1 > currentProductQuantity[0]?.product_total_qty;
    if (!response) {
      increaseCartQuantity(item?.product_id);
    } else {
      showAlert();
    }
  };


  if (currentProductQuantity.length == 0) {
    return;
  }

  // checking currentTimeQuantityOfProduct
  if(currentProductQuantity[0]?.product_total_qty < qty){
    item.qty = currentProductQuantity[0]?.product_total_qty;
    
  }
  
  // calling supbase to get current products quantity
  const loadCurrentProductQuantity = async () => {
    const data = await getCurrentQuantityOfProductsRelatedToId(
      item?.product_id
    );
    setCurrentProductQuantity(data);
  };

  // calling loadCurrentProductQuantityFunctionToLoad current time of product
  useEffect(() => {
    loadCurrentProductQuantity();
  }, [focused]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${imageUrl}${imagename[0]?.name}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{moreCharacter ? `${productName}...` : `${productName}`}</Text>
        <Text style={styles.price}>₹{price * qty}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteParticularItemInCart(product_id)}
        >
          <Entypo name="cross" size={24} color="rgb(188,188,188)" />
        </TouchableOpacity>
        {currentProductQuantity[0]?.product_total_qty == 0 ? (
          <View
            style={{
              backgroundColor: "#f3f3f3",
              width: 100,
              marginVertical: 10,
              padding: 5,
              borderRadius: 7,
            }}
          >
            <Text style={{ color: "red", fontWeight: "500" }}>
              Out of Stock
            </Text>
          </View>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseCartQuantity(product_id)}
            >
              <Feather name="minus" size={24} color="rgb(179,179,179)" />
            </TouchableOpacity>
            <Text style={styles.quantity}>
              {currentProductQuantity[0]?.product_total_qty < qty
                ? currentProductQuantity[0]?.product_total_qty
                : qty}
            </Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleAddToCart()}
            >
              <Feather name="plus" size={24} color="#69AF5D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {isAlertVisible && (
        <CustomAlert
          visible={isAlertVisible}
          title="Out of Stock"
          productName={`${product_name}`}
          productQty={`${currentProductQuantity[0]?.product_total_qty}`}
          onClose={closeAlert}
        />
      )}
    </View>
  );
};

// Get device dimensions
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.03, // 3% of screen width
    marginVertical: width * 0.02, // 2% of screen width
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: width * 0.05, // 3% of screen width
    borderBottomWidth: 1,
    // elevation: 1, // Adds a shadow on Android
    shadowColor: "#000", // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
  },
  imageContainer: {
    width: width * 0.15, // 25% of screen width
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden", // Ensures image fits within container
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1, // Maintains aspect ratio
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04, // 4% of screen width
    position: "relative",
  },
  productName: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    color: "rgb(53,52,64)",
    fontSize: width * 0.04, // Responsive font size
    position: "absolute",
    right: width * 0.02, // 2% of screen width
    bottom: width * 0.03, // 3% of screen width
    fontWeight: "bold",
  },
  deleteButton: {
    position: "absolute",
    right: width * 0.02, // 2% of screen width
    top: width * 0.02, // 2% of screen width
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: width * 0.03, // 3% of screen width
  },
  quantityButton: {
    width: width * 0.10, // 12% of screen width
    height: width * 0.10, // 12% of screen width
    borderWidth: 1,
    borderColor: "rgb(240,240,240)",
    borderRadius: width * 0.05, // 6% of screen width
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width * 0.02, // 2% of screen width
  },
  quantity: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "bold",
  },
});

export default CartItemCard;



