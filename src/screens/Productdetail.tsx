import React, { useState } from "react";
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

const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};

const Productdetail = ({ name }: any) => {
  const navigation = useNavigation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/productdetailback.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <AntDesign
          name="left"
          size={24}
          color="black"
          style={styles.backIcon}
          onPress={() => navigation.replace("Favourite")}
        />
        <Octicons
          name="share"
          size={24}
          color="black"
          style={{ marginLeft: 320 }}
          onPress={() => navigation.replace("Favourite")}
        />
        <Image
          source={require("../../assets/Vectorapples.png")}
          style={styles.image}
        />
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>
          Natural Red Apples
          <Entypo
            name="heart-outlined"
            size={24}
            color="black"
            onPress={() => navigation.replace("Favourite")}
          />
        </Text>
        <Text style={styles.productPrice}>1Kg, price</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={styles.quantityButton}
          >
            <Entypo name="minus" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={styles.quantityButton}
          >
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginLeft: 85 }}>R99</Text>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Product Details</Text>
          <TouchableOpacity onPress={toggleDetails} style={styles.toggleButton}>
            <Entypo
              name={detailsExpanded ? "chevron-small-up" : "chevron-small-down"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {detailsExpanded && (
          <Text style={styles.detailsText}>
            Apples are Nutritious. Apples May Be Good For Weight Loss. Apples
            May Be Good for your heart. As part of a healthful and varied diet.
          </Text>
        )}

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Nutritions</Text>
          <TouchableOpacity
            onPress={toggleNutrition}
            style={styles.toggleButton}
          >
            <Entypo
              name={
                nutritionExpanded ? "chevron-small-up" : "chevron-small-down"
              }
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {nutritionExpanded && (
          <Text style={styles.detailsText}>
            Total Fat 0.2 g, Cholesterol 0 mg 0%, Sodium 1 mg 0%, Potassium 107
            mg
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
          onPress={() => navigation.replace("Onboarding")}
        >
          <Text style={styles.addToCartButtonText}>Add to Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
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
    width: 329,
    height: 199,
    alignSelf: "center",
    marginBottom: 30,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginRight: 50,
  },
  quantityButton: {
    marginHorizontal: 30,
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
