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
import { useMyContext } from "../context/Context";
import { addToCart, deleteParticularItemInCart } from "./supabaseClient";


// import AppLoading from "expo-app-loading";
// import * as Font from "expo-font";
const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};
// const [fontLoaded, setFontLoaded] = useState(false);
// if (!fontLoaded) {
//   return (
//     <AppLoading
//       startAsync={loadFonts}
//       onFinish={() => setFontLoaded(true)}
//       onError={console.warn}
//     />
//   );
// }

const Productdetail = ({ name }: any) => {
  const navigation = useNavigation();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toggleFavItem,setToggleFavItem] = useState(false);
  const { favouriteItem, addFavouriteItem } = useMyContext();
  console.log(favouriteItem);
  

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

  const addItemToCart = () => {
    deleteParticularItemInCart(1);
  }


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
          style={{position:"absolute",top:10,left:10}}
          onPress={() => navigation.replace("Favourite")}
        />
        <Octicons
          name="share"
          size={24}
          color="black"
          style={{position:"absolute",top:10,right:10}}
          onPress={() => navigation.replace("Favourite")}
        />
        <Image
          source={require("../../assets/Vectorapples.png")}
          style={styles.image}
        />
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <View style={{display:"flex",width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:5}}>
        <Text style={{fontSize:24,fontFamily:"Gilroy-Bold"}}>
          Natural Red Apples
        </Text>
        <Entypo
            name="heart-outlined"
            size={24}
            onPress={() => {
              if(toggleFavItem){
                navigation.navigate("Favourite");
              }else{
                addFavouriteItem("Apple",100);
                setToggleFavItem(!toggleFavItem);
              }

            }}
            // onPress={() => navigation.replace("Favourite")}
            color={toggleFavItem ? "red" : "black"}
          />
        </View>
       
        <Text style={{width:"100%",color:"#c4b7b7",fontWeight:"500"}}>1Kg, Price</Text>
        <View style={{display:"flex",width:"100%",justifyContent:"space-between",flexDirection:"row",alignItems:"center",padding:15}}>
          <View style={{display:"flex",flexDirection:"row",gap:5}}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={{display:"flex",justifyContent:"center",alignItems:"center",width:50,height:50,borderRadius:10}}
          >
            <Entypo name="minus" size={24} color="black" />
          </TouchableOpacity>
          <View style={{display:"flex",justifyContent:"center",alignItems:"center",width:50,height:50,borderRadius:15,borderWidth:2,borderColor:"#c4b7b7"}}>
             <Text style={{fontSize:20}}>{quantity}</Text>
          </View>
         
          <TouchableOpacity
            onPress={increaseQuantity}
            style={{display:"flex",justifyContent:"center",alignItems:"center",width:50,height:50,borderRadius:10}}
          >
            <Entypo name="plus" size={24} color="#69AF5D" />
          </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 18, marginLeft: 85 }}>₹99</Text>
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
          <Text style={styles.addToCartButtonText} onPress={addItemToCart}>Add to Basket</Text>
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
    position:"absolute",
    top:10,
    left:20,
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
