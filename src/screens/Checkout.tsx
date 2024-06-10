import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import { CategoryData } from "../components/Category";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';


const loadFonts = async () => {
    await Font.loadAsync({
        'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
        'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf')
    });

};


const Checkout = () => {
    const { cartItem } = useMyContext();
    const navigation = useNavigation<any>();
    const [deliveryMethod, setDeliveryMethod] = useState('Standard');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [promoCode, setPromoCode] = useState('');
    const [fontLoaded, setFontLoaded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        );
    }

    const handlePlaceOrder = () => {
        // Implement place order functionality
        console.log('Placing order...');
    };

    return (
       isModalVisible ?  <View style={{ backgroundColor: "white", position: "absolute", bottom: 20, height: 650, borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 100 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1c1c1c" }}>Checkout</Text>
                <Entypo name="cross" size={28} color="black" style={{ position: "absolute", right: 10 }} onPress={() => toggleModal()}/>
            </View>
            <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
                <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Delivery</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}>Select method</Text><Image source={require("../../assets/Vector.png")} /></View>
            </View>
            <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
                <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Payment</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Image style={{ marginRight: 18 }} source={require("../../assets/card.png")} />
                        <Image source={require("../../assets/Vector.png")} />
                    </View>
                </View>
            </View>
            <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
                <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Promo Code</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold", color: "black" }}>Pick discount</Text><Image source={require("../../assets/Vector.png")} /></View>
            </View>
            <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
                <Text style={{ fontSize: 18, color: "#828181", fontWeight: "500" }}>Total Cost</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}> ₹300</Text><Image source={require("../../assets/Vector.png")} /></View>
            </View>
            <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
            <View style={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text style={{ color: "#828181", fontSize: 12, fontWeight: "bold" }}>By placing an order you agree to our{"\n"}<Text style={{ color: "black" }}>Terms</Text> and <Text style={{ color: "black" }}>Conditions</Text></Text>
            </View>
            <View style={{width: "100%", backgroundColor: "white", marginTop: 30, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center",paddingHorizontal:20}}>
                <TouchableOpacity style={{ backgroundColor: "#69AF5D",width:"100%",paddingVertical: 20,borderRadius:20}} onPress={() => navigation.replace("Orderaccepted")}>
                    <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white"}}>Place Order</Text>
                </TouchableOpacity>
            </View>

        </View> : "")
};


{/* <View style={{position:"absolute",bottom:50,backgroundColor:"red"}}>
<View style={{
    width:"100%",
    backgroundColor:"white",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:10,
    alignItems:"center",
}}>
    <Text style={{}}>Checkout</Text>
    <View style={{ marginRight: 300, zIndex: 1 }}>
        <Entypo name="cross" size={26} color="black"
            onPress={() => navigation.replace("Profile")} /></View>
</View>

<View style={styles.section}>
    <Text style={styles.sectionTitle}>Delivery:</Text>
    <TouchableOpacity
        style={styles.option}
        onPress={() => setDeliveryMethod('Standard')}
    >
        <Text style={styles.optionText}>Select method</Text>
        <Image source={require("../../assets/Vector.png")} />
    </TouchableOpacity>
</View>

<View style={styles.section}>
    <Text style={styles.sectionTitle}>Payment:</Text>
    <TouchableOpacity
        style={styles.option}
        onPress={() => setPaymentMethod('Credit Card')}
    >
        <Image style={{ marginRight: 18 }} source={require("../../assets/card.png")} />
        <Image source={require("../../assets/Vector.png")} />
    </TouchableOpacity>
</View>

<View style={styles.section}>
    <Text style={styles.sectionTitle}>Promo Code:</Text>
    <TouchableOpacity
        style={styles.option}
        onPress={() => setPromoCode('')}
    >
        <Text style={styles.optionText}>Pick Discount</Text>
        <Image source={require("../../assets/Vector.png")} />
    </TouchableOpacity>
</View>

<View style={styles.section}>
    <Text style={{ color: "#7C7C7C", fontSize: 18 }}>Total Cost:  <Text style={{ gap: 400 }}></Text>
        <FontAwesome name="rupee" size={15} color="#000000" />{1200}</Text>
    <Image source={require("../../assets/Vector.png")} />
</View>
<Text style={styles.termsText}>By placing order you agree to our <Text style={{ fontWeight: 'bold', color: '#181725', fontFamily: 'Gilroy-Semibold' }}>terms</Text> and <Text style={{ fontWeight: 'bold', color: '#181725', fontFamily: 'Gilroy-Semibold' }}>conditions.</Text></Text>

<TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.replace("Orderaccepted")}>
    <Text style={styles.placeOrderButtonText}>Place Order</Text>
</TouchableOpacity>
</View> */}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        backgroundColor: "red",
        position: "absolute",
        bottom: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    header: {
        fontSize: 24,
        fontFamily: 'Gilroy-Semibold',
        marginBottom: 20,

    },
    section: {
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 1,
        marginRight: 10,
        color: '#7C7C7C',
        fontFamily: 'Gilroy-Semibold'
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.1,
        borderRadius: 5,
        padding: 10,
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: "#E2E2E2",
    },
    optionText: {
        fontSize: 14,
        marginRight: 17,
        fontFamily: 'Gilroy-Semibold'

    },
    input: {
        borderWidth: 0.1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    placeOrderButton: {
        width: 300,
        height: 65,
        backgroundColor: "#69AF5D",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 50
    },
    placeOrderButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 14,
        marginTop: 20,
        color: '#7C7C7C',
        fontFamily: 'Gilroy-Semibold',
    },
});

export default Checkout;
