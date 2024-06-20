import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
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

const SearchScreen = ({navigation}) => {
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
    
  },[])

  return (
    <View>
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
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
            marginLeft: 20,
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
            // backgroundColor:"blue"
          }}
        >
          {/* <View style={{width:"100%",backgroundColor:"black",flexDirection:"row",height:"auto"}}> */}
          {/* <View style={{width:100,height:100,flexDirection:"row",}}> */}
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
                        <Image
                          style={{ width: "100%", height: 110 }}
                          resizeMode="contain"
                          source={{ uri: item.product_imagename }}
                        />
                        <Text
                          style={{
                            margin: 10,
                            fontSize: 16,
                            color: "#6b6e6a",
                            fontWeight: "600",
                            // fontFamily: "Gilroy-Bold",
                          }}
                        >
                          {item.product_name}
                        </Text>
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
                                  <Text style={{fontSize:20}}>
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
                                  fontSize: 25,
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
                          {/* {increaseCardQuantity.length === 0 ? (
                            <></>
                          ) : (
                            <>
                              <View
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginVertical: 10,
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: "green",
                                    borderRadius: 5,
                                    borderColor: "green",
                                    borderWidth: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                    width: "80%",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 10,
                                    // paddingVertical:10
                                  }}
                                >
                                  <Text
                                    // onPress={() =>
                                    //   decreaseCardQuantity(item.id)
                                    // }
                                    style={{
                                      fontSize: 30,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                      height: "100%",
                                    }}
                                  >
                                    -
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                    }}
                                  ></Text>
                                  <Text
                                    style={{
                                      fontSize: 30,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                      height: "100%",
                                    }}
                                  >
                                    +
                                  </Text>
                                </View>
                              </View>
                            </>
                          )} */}
                        </View>
                      </View>
                    </TouchableOpacity> ) :<View style={{alignItems:"center",paddingTop:200}}><Text style={{fontWeight:"semibold",fontSize:20,fontFamily:"serif",textDecorationLine:"underline"}}>"Product Not Found"</Text></View>}
                    {/* </View> */}
                    {/* // </View> */}
        </View>
        }
      </ScrollView>
    </View>
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
    height: 300,
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
