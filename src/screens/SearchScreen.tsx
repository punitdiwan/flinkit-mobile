import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React,{useEffect, useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchSubCategory from "../components/SearchSubCategory";
import { CategoryData } from "../components/Category";
import SearchCard from "../components/SearchCard";
import  Category  from "../components/Category";
import { getAllProducts } from "./supabaseClient";
import { useMyContext } from "../context/Context";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";

const SearchScreen = ({navigation}) => {
  const focus = useIsFocused();

  const [text, setText] = useState('');
  const [mapData,setMapData] = useState([]);
  const [dummyData,setDummyData] = useState([]);

  const {cartItem,addingItemInCart,decreaseCartQuantity,increaseCartQuantity} = useMyContext();
  

  console.log(mapData);
  

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const filterData = dummyData?.filter((item) => item?.product_name?.toLowerCase()?.includes(text.toLowerCase()));
  console.log(filterData);
  
  const getProducts = async () => {
    const productData:any = await getAllProducts();
    setDummyData(productData);
  } 

  useEffect(() => {
    getProducts(); 
    setText("");
  },[focus])

  return (
    <>
    <StatusBar backgroundColor="rgb(255,255,255)" barStyle={"dark-content"} />
    <View>
      <ScrollView style={{ backgroundColor: "#ffffff" }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 10,
            width: "90%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:'row',
            gap:10,
            marginLeft: 20
          }}
        >
          <View style={styles.searchBody}>
            <View>
              <Icon name="search" size={25} color="rgba(0, 0, 0, 0.459);" />
            </View>
            <TextInput
              style={{ width: "70%", height: 25, marginRight: 75,fontWeight:"bold" }}
              placeholder="Search store"
              onChangeText={handleInputChange}
              value={text}
            />
          </View>
          <View >
            <TouchableOpacity onPress={()=>navigation.navigate('Filter')}>
            <Image
              source={require("../../assets/Group 6839.png")}
              style={{ width: 15, height: 15 }}
              />
              </TouchableOpacity>
          </View>
        </View>
        

        
        {
          text == "" ? <Category/>:
            
            <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 10,
            minHeight:650,
            paddingBottom:40
          }}
        >
          {filterData.length > 0 ? filterData.map(item => <TouchableOpacity
                      key={item.product_id}
                      style={styles.body}
                      // onPress={() =>
                      //   console.log("Productdetail", item.product_id)
                      // }
                      onPress={() =>
                        navigation.navigate("Productdetail", {
                          id: item.product_id,
                        })
                      }
                    >
                      <View key={item.product_id}>
                        <View>
                        <Image
                          style={{ width: "100%", height: 110 }}
                          resizeMode="contain"
                          source={{ uri: item.product_imagename }}
                        />
                        <View style={{height:58
                        }}>
                        <Text
                          style={{
                            marginTop: 10,
                            fontSize: 16,
                            color: "#6b6e6a",
                            fontWeight: "600",
                            // fontFamily: "Gilroy-Bold",
                            marginBottom:1
                          }}
                        >
                          {item.product_name}
                        </Text>
                        </View>
                        <Text style={{paddingTop:5,color:"rgb(205,205,205)",fontWeight:"bold",marginBottom:20}}>325ml,Price</Text>
                        </View>
                     
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000000",
                                fontWeight: "600",
                              }}
                            >
                              ₹ {item.price}
                            </Text>

                            {/* {console.log("yes",(cartItem.filter(itemm => itemm.product_id == item.product_id))[0]?.qty)} */}

                            {cartItem.filter(itemm => itemm.product_id == item.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
                                <TouchableOpacity style={{
                                  // backgroundColor:"red",
                                  width:30,
                                  height:30,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"center",
                                  // borderWidth:1,
                                  borderColor:"#bab7b6",
                                  borderRadius:5
                                }}
                                onPress={() => decreaseCartQuantity(item?.product_id)}
                                >
                                  <Text style={{color:"#bab7b6"}}>
                                  <Entypo name="minus" size={20}/>
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                  // backgroundColor:"red",
                                  width:30,
                                  height:30,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"center",
                                  // borderWidth:1,
                                  borderColor:"#bab7b6",
                                  borderRadius:5
                                }}>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>
                                  {cartItem.filter(itemm => itemm.product_id == item.product_id)?.[0]?.qty}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                  // backgroundColor:"red",
                                  width:30,
                                  height:30,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"center",
                                  // borderWidth:1,
                                  borderColor:"#bab7b6",
                                  borderRadius:5
                                }}
                                onPress={() => increaseCartQuantity(item?.product_id)}
                                >
                                  <Text style={{fontSize:20,color:"#69AF5D"}}>
                                  <Entypo name="plus" size={20}/>
                                  </Text>
                                </TouchableOpacity>
                            </View> :   <TouchableOpacity
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
                                  fontSize: 20,
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
                              
                          

                          
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity> ) :<View style={{alignItems:"center",paddingTop:200}}><Text style={{fontWeight:"semibold",fontSize:20,fontFamily:"serif",textDecorationLine:"underline"}}>"Product Not Found"</Text></View>}
                    {/* </View> */}
                    {/* // </View> */}
        </View>
        }
      </ScrollView>
    </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBody: {
    // borderWidth:1,
    // borderColor:'#00000048',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    width: "100%",
    backgroundColor: "rgb(242,243,242)",
  },
  body: {
    width: "45%",
    height: 280,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0ebeb",
    shadowColor: "white",
  },
});
