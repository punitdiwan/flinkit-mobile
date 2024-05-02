import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import RupeeIcon from "react-native-vector-icons/FontAwesome6";
const Product_Details = ({ route }: any) => {
  const { name, imgUrl } = route.params;
  return (
    <View>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: imgUrl }}
          style={{ width: "100%", height: "auto", aspectRatio: 1 }}
        />
      </View>
      <View style={styles.productDetails}>
        <View style={styles.productName}>
          <Text style={styles.productHeading}>{name}</Text>
          <View style={styles.priceNaddBtn}>
            <Text style={styles.priceText}>
              <RupeeIcon
                name="indian-rupee-sign"
                color={"green"}
                style={styles.priceText}
              />
              15
            </Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>Brand</Text>
          <Text style={styles.brandType}>Pvt retail</Text>
        </View>
        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>Unit</Text>
          <Text style={styles.brandType}>10g</Text>
        </View>
        <View style={styles.brandContainer2}>
          <Text style={styles.brandText}>Key Features</Text>
          <Text style={styles.brandType}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
            voluptates nemo aperiam optio debitis molestiae excepturi hic neque
            deleniti pariatur laudantium reprehenderit nam facilis, aliquam eius
            a iusto quisquam quas!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Product_Details;
const styles = StyleSheet.create({
  imgContainer: {
    // borderWidth: 1,

    width: "70%",
    height: " 45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "15%",
    marginVertical: 10,
    backgroundColor: "white",
  },
  productDetails: {},
  productName: {
    display: "flex",

    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",

    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  priceNaddBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  addBtn: {
    paddingVertical: 10,

    width: "15%",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  addBtnText: {
    color: "white",
  },
  productHeading: {
    fontSize: 22,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  brandContainer: {
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-evenly",
    height: 70,
  },
  brandContainer2: {
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-evenly",
    height: "auto",
  },
  brandText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brandType: {
    fontSize: 15,
  },
});
