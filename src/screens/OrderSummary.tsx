import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMyContext } from '../context/Context'
import { addItemsInOrder, getCurrentQuantityOfProducts } from './supabaseClient';
import { withDecay } from 'react-native-reanimated';
import { imageUrl } from '../../lib/constant';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

// Utility Functions
const generateRandomCode = (length = 8) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };
  
  const getMonthName = (index:any) =>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][index];
  
  // console.log("getMonthName",getMonthName);
  
  const getCurrDate = () => {
    const currentDate = new Date();
    return `${currentDate.getDate()} ${getMonthName(
      currentDate.getMonth()
    )} ${currentDate.getFullYear()}`;
  };

const OrderSummary = () => {
  const {cartItem,clearCart} = useMyContext();
  const [currentProducts,setCurrentProducts] = useState([]);
  const [checkoutVisible,setIsCheckoutVisible] = useState(false);
  const [changesInQty,setChangesInQty] = useState(false);

  const navigation = useNavigation();
  
  const calculateTotalAmount = () => {
    const currentProductQuantity = cartItem?.map(item => currentProducts?.filter(itemm => itemm?.product_id == item?.product_id));
    console.log("ojjhjkh",currentProductQuantity);
    
    return (
      cartItem?.reduce((acc, item) => acc + item?.qty * item?.price, 0) ?? 0
    );
  };

  const handleCheckout = async () => {
    const newCartItem = cartItem.filter(item => item?.qty !== 0);
    const totalAmount = calculateTotalAmount();
    const dateOfOrder = getCurrDate();
    const darkroomOwnerId = cartItem?.[0]?.darkroomownerid;
    const orderId = generateRandomCode();

    await addItemsInOrder(
      orderId,
      totalAmount,
      darkroomOwnerId,
      dateOfOrder,
      newCartItem
    );
    clearCart();
    navigation.navigate("Orderaccepted");
    setIsCheckoutVisible(false);
  };
  
  const loadProducts = async () => {
    const data = await getCurrentQuantityOfProducts();
    setCurrentProducts(data);
  }

  const renderCheckout = () => (
    <View style={styles.checkoutContainer}>
      <View style={styles.checkoutHeader}>
        <Text style={styles.checkoutTitle}>Checkout</Text>
        <Entypo
          name="cross"
          size={28}
          color="black"
          onPress={() => setIsCheckoutVisible(false)}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.checkoutSection}>
        <Text style={styles.sectionTitle}>Delivery</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionContentText}>Select method</Text>
          <Image source={require("../../assets/Vector.png")} />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.checkoutSection}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.sectionContent}>
          <Image
            style={styles.paymentIcon}
            source={require("../../assets/card.png")}
          />
          <Image source={require("../../assets/Vector.png")} />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.checkoutSection}>
        <Text style={styles.sectionTitle}>Promo Code</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionContentText}>Pick discount</Text>
          <Image source={require("../../assets/Vector.png")} />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.checkoutSection}>
        <Text style={styles.sectionTitle}>Total Cost</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.totalCost}>₹{calculateTotalAmount()}</Text>
          <Image source={require("../../assets/Vector.png")} />
        </View>
      </View>
      <Text style={styles.termsText}>
        By placing an order you agree to our{"\n"}
        <Text style={styles.termsLink}>Terms</Text> and{" "}
        <Text style={styles.termsLink}>Conditions</Text>
      </Text>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handleCheckout}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  const ProductCard = ({item}:any) =>  {
    const moreCharacter = item?.product_name.length > 10 ? true : false;
    item.product_name = moreCharacter ? item?.product_name.slice(0,8) : item?.product_name;
    

    const checkCurrProductAvailability = currentProducts.filter(itemm => itemm?.product_id == item?.product_id);
    
    if(checkCurrProductAvailability[0]?.product_total_qty < item?.qty){
      setChangesInQty(!changesInQty);
      item.qty = checkCurrProductAvailability[0]?.product_total_qty
    }
    
    return <View style={{width:"100%",paddingHorizontal:10,marginVertical:5,flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,paddingVertical:5,borderBottomColor:"#f0f0f0"}}>
      <View style={{flexDirection:"row",alignItems:"center",gap:5,width:"45%",gap:5}}>
          <Image source={{uri:`${imageUrl}${item?.imagename[0]?.name}`}} style={{width:45,height:45,borderRadius:10}} />
          <Text style={{fontWeight:"bold"}}>{moreCharacter ? `${item?.product_name}...`: item?.product_name } </Text>
      </View>

      <View style={{flexDirection:"row",justifyContent:"space-between",width:"50%",alignItems:"center"}}>
        <Text style={{fontWeight:500}}>{checkCurrProductAvailability[0]?.product_total_qty == 0  ? <Text style={{color:"red"}}> No</Text> : "Yes"}</Text>
        <Text style={{fontWeight:500}}>{item?.qty}</Text>
        <Text style={{fontWeight:500}}>₹{item?.price}</Text>
      </View>
    </View>
  }

  useEffect(() => {
    loadProducts();
  },[])

  useEffect(() => {
    console.log("running");
    
  },[changesInQty])

  return (
    <SafeAreaView>
    <View style={{backgroundColor:"#fff",width:"100%",height:"100%"}}>
       <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10,paddingTop:10,borderBottomColor:"#AAAAaa",borderBottomWidth:0.5,paddingBottom:15}}>
         <View>
            <Text style={{fontWeight:500,fontSize:15,color:"rgb(105,175,94)"}}>Product</Text>
         </View>
         <View style={{flexDirection:"row",justifyContent:"space-between",width:"55%"}}>
         <View>
            <Text style={{fontWeight:500,fontSize:15,color:"rgb(105,175,94)"}}>Availability</Text>
         </View>
         <View>
            <Text style={{fontWeight:500,fontSize:15,color:"rgb(105,175,94)"}}>Quantity</Text>
         </View>
         <View>
            <Text style={{fontWeight:500,fontSize:15,color:"rgb(105,175,94)"}}>Price</Text>
         </View>
         </View>
        </View> 

         <View style={{paddingTop:0,marginBottom:200,minHeight:"75%",paddingHorizontal:10}}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItem}
        renderItem={({item}) => <ProductCard item={item} />}
        keyExtractor={item => item?.product_id}
      />
      </View>
      <View style={{position:"absolute",flexDirection:"row",justifyContent:"space-between",width:"100%",bottom:100,padding:10}}>
        <Text style={{fontSize:16,fontWeight:500}}>Total Price</Text>
        <Text style={{color:"rgb(105,175,94)",fontWeight:"bold",fontSize:16}}>₹{calculateTotalAmount()}</Text>
      </View>
      {cartItem?.length > 0 && <View style={{justifyContent:"center",alignItems:"center",width:"100%",paddingHorizontal:5,position:"absolute",bottom:40}}>
        <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",width:"100%",justifyContent:"center",alignItems:"center",paddingVertical:10,borderRadius:10}} onPress={() => setIsCheckoutVisible(true)}>
            <Text style={{fontWeight:"500",color:"white",fontSize:15}}>Continue</Text>
        </TouchableOpacity>
      </View>}
    </View>
    {checkoutVisible && renderCheckout()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    separator: {
        width: "100%",
        height: 2,
        backgroundColor: "#edebeb",
      },
      checkoutSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 55,
        paddingHorizontal: 10,
      },
      sectionTitle: {
        fontSize: 18,
        color: "#8c8c8c",
        fontWeight: "500",
      },
      sectionContent: {
        flexDirection: "row",
        alignItems: "center",
      },
      sectionContentText: {
        fontWeight: "bold",
      },
      paymentIcon: {
        marginRight: 18,
      },
      totalCost: {
        fontWeight: "bold",
      },
      termsText: {
        color: "#828181",
        fontSize: 12,
        fontWeight: "bold",
        marginVertical: 15,
      },
      termsLink: {
        color: "black",
      },
      placeOrderButton: {
        backgroundColor: "#69AF5D",
        width: "100%",
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      placeOrderButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
      },
      checkoutContainer: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        width: "100%",
      },
      checkoutHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
      },
      checkoutTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1c1c1c",
      },
})

export default OrderSummary