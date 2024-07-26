// 

import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useMyContext } from "../context/Context";
import { imageUrl } from "../../lib/constant";
import { CustomAlert } from "../utils/CheckQuantity";

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
  console.log("cardItemCard",item);
  
  const { deleteParticularItemInCart, decreaseCartQuantity, increaseCartQuantity } = useMyContext();
  const { product_name, price, imagename, qty, product_id,product_total_qty} = item;

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => setIsAlertVisible(true);
  const closeAlert = () => setIsAlertVisible(false);

  const handleAddToCart = () => {
    const response = qty+1 > product_total_qty;
    if (!response) {
      increaseCartQuantity(item?.product_id);
    } else {
      showAlert();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${imageUrl}${imagename[0]?.name}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product_name}</Text>
        <Text style={styles.price}>₹{price * qty}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteParticularItemInCart(product_id)}
        >
          <Entypo name="cross" size={24} color="rgb(188,188,188)" />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseCartQuantity(product_id)}
          >
            <Feather name="minus" size={24} color="rgb(179,179,179)" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{qty}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleAddToCart()}
          >
            <Feather name="plus" size={24} color="#69AF5D" />
          </TouchableOpacity>
        </View>
      </View>
      {isAlertVisible && 
        (
          <CustomAlert
            visible={isAlertVisible}
            title="Out of Stock"
            productName={`${product_name}`}
            productQty={`${product_total_qty}`}
            onClose={closeAlert}
          />)
      }
    </View>
  );
};

// Get device dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.03, // 3% of screen width
    marginVertical: width * 0.02,  // 2% of screen width
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: width * 0.03,   // 3% of screen width
    borderBottomWidth: 1,
    elevation: 1, // Adds a shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
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
    top: width * 0.02,   // 2% of screen width
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: width * 0.03, // 3% of screen width
  },
  quantityButton: {
    width: width * 0.12, // 12% of screen width
    height: width * 0.12, // 12% of screen width
    borderWidth: 2,
    borderColor: "rgb(240,240,240)",
    borderRadius: width * 0.06, // 6% of screen width
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
