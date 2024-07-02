// import { View,Text,ScrollView,TouchableOpacity } from "react-native";
// import { useNavigation, useRoute } from '@react-navigation/native';

// const ShowingFilterData = ({id,category,brand}:any) => {
//     // const route = useRoute();
    
//     // const {id} = route.params;
//     // console.log(id);
//     console.log(category.route.params.category);
    

//     return (
//        <View>
//         <Text>ShowingFilterData</Text>
//        </View>
//       );
// }

// export default ShowingFilterData;

import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,Image,StyleSheet } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import { getProductsRelatedToCategoryId } from './supabaseClient';
import { useMyContext } from '../context/Context';
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ShowingFilterDataProps {
  // Define your prop types if needed
  id: number;
  category: string;
  brand: string;
}

const ShowingFilterData: React.FC<ShowingFilterDataProps> = () => {
  const route = useRoute();
  const {id,category,brand} = route.params;
  
  const [products,setProducts] = useState([]);
  const navigation = useNavigation();
  const {cartItem,increaseCartQuantity,decreaseCartQuantity,addingItemInCart} = useMyContext();

  const getAllProducts = async (categoryId:any) => {
       const response = await getProductsRelatedToCategoryId(categoryId);
    //    console.log("showingFilter",response);
    //    console.log("brandd",brand);
    let filterProductsOnBrand = response;
       if(brand){
         filterProductsOnBrand = await response?.filter(item => item?.product_brand?.toLowerCase() == brand.toLowerCase() );
       }
       setProducts(filterProductsOnBrand);
  }

  useEffect(() => {
        getAllProducts(id);
  },[category,brand])

    return (
        <>
        <SafeAreaView style={{backgroundColor:"white"}}>
          <View style={{height:50,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingHorizontal:10}}>
            <AntDesign name='arrowleft' size={24} style={{fontWeight:"bold",marginRight:150}} onPress={() => navigation.navigate("Filter")}/>
            <Text style={{fontSize:22,fontWeight:"500"}}>Filter</Text>
          </View>
         {products.length == 0 ? <View style={{width:"100%",justifyContent:"center",alignItems:"center",minHeight:"100%"}}><Text style={{fontSize:20,fontWeight:"400",textDecorationLine:"underline"}}>"No such Products"</Text></View>: <View
            style={{
              display: "flex",
              flexDirection: "row",    
              minHeight: "100%",
              width:"100%",
              backgroundColor:"#f2f0f0",
              paddingVertical:5,
              flexWrap:"wrap",
              justifyContent:"space-around",
              alignItems:"center",
              paddingHorizontal:3
            
            }}
          >
            {products.map(item => 
                <View style={{backgroundColor:"white",width:200,marginVertical:3,paddingVertical:30,paddingHorizontal:10,borderRadius:10,height:260,borderWidth:1,borderColor:"rgb(233,233,233)"}}>
                  <TouchableOpacity onPress={() => navigation.navigate("Productdetail", {id: item?.product_id})
          } >
                    <View>
                    <Image  style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: item?. product_imagename }}
                />
                <View style={{height:40}}>
                 <Text style={{fontSize:15,fontWeight:"bold"}}>{item?.product_name}</Text>
                 </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:15,alignItems:"center"}}>

                        <View>
                        <Text style={{fontSize:15,fontWeight:"bold"}}>₹{item?.price}</Text>
                        </View>

                        {cartItem.filter(itemm => itemm?.product_id == item?.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
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
                      {cartItem.filter(itemm => itemm?.product_id == item?.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{    width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5}} onPress={() => increaseCartQuantity(item?.product_id)}>
                        <Entypo name='plus' style={{fontSize:20,color:"#69AF5D"}} />
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
                </TouchableOpacity>
                </View>
            )}

          </View>
}
</SafeAreaView>
        </>
      );
};

export default ShowingFilterData;

const styles = StyleSheet.create({
    body: {
      width: "45%",
      height: "auto",
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


//   { products?.map(
//     (
//       item: {
//         product_category: any;
//         product_id: React.Key | null | undefined;
//         product_imagename: any;
//         product_name:
//           | string
//           | number
//           | boolean
//           | React.ReactElement<
//               any,
//               string | React.JSXElementConstructor<any>
//             >
//           | Iterable<React.ReactNode>
//           | React.ReactPortal
//           | null
//           | undefined;
//         price:
//           | string
//           | number
//           | boolean
//           | React.ReactElement<
//               any,
//               string | React.JSXElementConstructor<any>
//             >
//           | Iterable<React.ReactNode>
//           | React.ReactPortal
//           | null
//           | undefined;
//         id: string;
//       },
//       index: any
//     ) => {
//       return (
//         <TouchableOpacity
//           key={item.product_id}
//           style={styles.body}
//           // onPress={() =>
//           //   console.log("Productdetail", item.product_id)
//           // }
          // onPress={() =>
          //   navigation.navigate("Productdetail", {
          //     id: item.product_id,
          //   })
          // }
//         >
//           <View key={item.product_id} style={}>
//             <Image
//               style={{ width: "100%", height: 110 }}
//               resizeMode="contain"
//               source={{ uri: item.product_imagename }}
//             />
//             <Text
//               style={{
//                 margin: 10,
//                 fontSize: 16,
//                 color: "#6b6e6a",
//                 fontWeight: "600",
//                 // fontFamily: "Gilroy-Bold",
//               }}
//             >
//               {item.product_name}
//             </Text>
//             <View
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <View
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexDirection: "row",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     color: "#000000",
//                     fontWeight: "600",
//                   }}
//                 >
//                   ₹ {item.price}
//                 </Text>

//                 {/* {console.log("yes",(cartItem.filter(itemm => itemm.product_id == item.product_id))[0]?.qty)} */}

                // {cartItem.filter(itemm => itemm.product_id == item.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
                //     <TouchableOpacity style={{
                //       // backgroundColor:"red",
                //       width:30,
                //       height:30,
                //       display:"flex",
                //       alignItems:"center",
                //       justifyContent:"center",
                //       // borderWidth:1,
                //       borderColor:"#bab7b6",
                //       borderRadius:5
                //     }}
                //     onPress={() => decreaseCartQuantity(item?.product_id)}
                //     >
                //       <Text style={{color:"#bab7b6"}}>
                //       <Entypo name="minus" size={20}/>
                //       </Text>
                //     </TouchableOpacity>
                //     <TouchableOpacity style={{
                //       // backgroundColor:"red",
                //       width:30,
                //       height:30,
                //       display:"flex",
                //       alignItems:"center",
                //       justifyContent:"center",
                //       // borderWidth:1,
                //       borderColor:"#bab7b6",
                //       borderRadius:5
                //     }}>
                //       <Text style={{fontSize:20}}>
                //       {cartItem.filter(itemm => itemm.product_id == item.product_id)?.[0]?.qty}
                //       </Text>
                //     </TouchableOpacity>
                //     <TouchableOpacity style={{
                //       // backgroundColor:"red",
                //       width:30,
                //       height:0,
                //       display:"flex",
                //       alignItems:"center",
                //       justifyContent:"center",
                //       // borderWidth:1,
                //       borderColor:"#bab7b6",
                //       borderRadius:5
                //     }}
                //     onPress={() => increaseCartQuantity(item?.product_id)}
                //     >
                //       <Text style={{fontSize:20,color:"#69AF5D"}}>
                //       <Entypo name="plus" size={20}/>
                //       </Text>
                //     </TouchableOpacity>
                // </View> :   <TouchableOpacity
                //   style={{
                //     width: 40,
                //     height: 40,
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //     backgroundColor: "#69AF5D",
                //     borderRadius: 15,
                //   }}
                // >
                //   <Text
                //     style={{
                //       fontSize: 25,
                //       fontWeight: "bold",
                //       color: "white",
                //       // backgroundColor:"red",
                      
                //     }}
                //     onPress={() => addingItemInCart(item)}
                //   >
                //     +
                //   </Text>
                // </TouchableOpacity>
                
                // }
                  
              

              
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       );
//     }
//   )}