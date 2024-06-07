
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { deleteFavouriteItem, giveMeAllFavouriteItem } from './supabaseClient';
import { useMyContext } from '../context/Context';


const loadFonts = async () => {
  await Font.loadAsync({

    'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),

  });

};

const favouriteItems = [
  {
    id: '1',
    name: 'Sprite Can',
    price: 39,
    volume: '325ml,price',
    img: require("../../assets/sprite.png"),
  },
  {
    id: '2',
    name: 'Diet Coke',
    price: 39,
    volume: '355ml,price',
    img: require("../../assets/dietcoke.png"),
  },
  {
    id: '3',
    name: 'Apple & Grape Juice',
    price: 39,
    volume: '2L,price',
    img: require("../../assets/dietcoke.png"),
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    price: 39,
    volume: '325ml,price',
    img: require("../../assets/cocacola.png"),
  },
  {
    id: '5',
    name: 'Pepsi Can',
    price: 39,
    volume: '330ml,price',
    img: require("../../assets/pepsi.png"),
  },

];

const renderItem = ({ item }) => (
  
  <View style={{width:"100%"}}>
      <View>
        <View style={{display:"flex",flexDirection:"row",backgroundColor:"white",width:"100%",justifyContent:"space-between",alignItems:"center",height:100}}>
            <View style={{width:"5%"}}>
              <Image source={{uri:item?.image}} style={{width:"100%",height:50}} /> 
            </View>

            <View style={{width:"40%"}}>
             <Text style={styles.itemName} onPress={() => deleteItem()}>{item.name}</Text>
             <Text style={styles.itemVolume}>{item.volume}</Text>
            </View>

            <View style={{backgroundColor:"white",display:"flex",flexDirection:"row",width:"20%"}}>
              <View style={{display:"flex",gap:25,width:50,flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontWeight:500}}>₹{item.price}</Text>
              <Image source={require("../../assets/Vector.png")} />
              </View>
            </View>
        </View>
        <Text style={{ width: "100%", backgroundColor: "#e3e1e1", height: 1, fontWeight: "500" }}></Text>
      </View>
  </View>)






const Favourite = () => {
  const navigation = useNavigation<any>();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [list,setList] = useState([]);
  const {addItemsToFavourite,favouriteItem} = useMyContext();
  console.log("fav statte",favouriteItem);


  console.log("li",list);
  
  

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setFontLoaded(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  
  const gettingListFavItem = async () => {
    console.log("calling fav");
    const data = await giveMeAllFavouriteItem();
    // console.log(data);
    // addItemsToFavourite(data);
    setList(data?.data);
  }

  useEffect(() => {
    gettingListFavItem();
  },[])

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
      <Text
        style={{
          width: "100%",
          backgroundColor: "#e3e1e1",
          height: 1,
          fontWeight: "500",
        }}
      ></Text>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View>

        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#69AF5D",
            paddingVertical: 20,
            borderRadius: 10,
          }}
          onPress={() => navigation.replace("Onboarding")}
        >
          <Text style={styles.addToCartButtonText}>Add all to cart</Text>
        </TouchableOpacity>
      </View>
    </View>

 );
};





const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,

    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20


  },
  listContainer: {
    flexGrow: 1,
  },
  favouriteItem: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",

    backgroundColor: "#c9c7c7"

  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    // marginLeft: 10,
    // justifyContent: 'center',

    backgroundColor: "red"

  },
  itemName: {
    fontSize: 16,
    // fontWeight: 'bold',

    fontFamily: 'Gilroy-Bold'


  },
  itemPrice: {
    marginLeft: 200,
    fontSize: 16,

    color: '#333',
    fontFamily: 'Gilroy-Semibold'
  },
  itemVolume: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Gilroy-Medium'

  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
  },
  addToCartButton: {
    backgroundColor: "#69AF5D",
    width: 300,
    height: 67,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 35,
    marginBottom: 30,
    marginLeft: 23,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",


  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',

  },
  addToCartButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Gilroy-Semibold",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",



  },
});

export default Favourite;
