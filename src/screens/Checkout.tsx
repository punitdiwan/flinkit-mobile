import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import { CategoryData } from "../components/Category";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import  AppLoading  from 'expo-app-loading';
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
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
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
        <View style={styles.container}>
          <View style={{flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",gap:195}}>
            <Text style={styles.header}>Checkout</Text>
            <View style={{ marginRight:300,zIndex:1 }}>
      <Entypo name="cross" size={26} color="black" 
      onPress={() => navigation.replace("Profile")}/></View>
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
                    <Image style={{marginRight:18}} source={require("../../assets/card.png")} />
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
                <Text style={{ color: "#7C7C7C", fontSize: 18 }}>Total Cost:  <Text style={{gap:400}}></Text>
                 <FontAwesome name="rupee" size={15} color="#000000"/>{' '}{cartItem.reduce((total, cartItem) => {
                    const item = CategoryData.find((i) => i.id === cartItem.id);
                    return total + (item?.price || 0) * cartItem.quantity;
                }, 0)}</Text>
                 <Image source={require("../../assets/Vector.png")} />
            </View>
            <Text style={styles.termsText}>By placing order you agree to our <Text style={{ fontWeight: 'bold',color:'#181725',fontFamily:'Gilroy-Semibold' }}>terms</Text> and <Text style={{ fontWeight: 'bold',color:'#181725',fontFamily:'Gilroy-Semibold'}}>conditions.</Text></Text>

            <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.replace("Orderaccepted")}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontFamily:'Gilroy-Semibold',
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
        color:'#7C7C7C',
        fontFamily:'Gilroy-Semibold'
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
        marginRight:17,
        fontFamily:'Gilroy-Semibold'
        
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
        color:'#7C7C7C',
        fontFamily:'Gilroy-Semibold',
    },
});

export default Checkout;
