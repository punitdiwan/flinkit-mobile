import React from 'react';
import { StyleSheet } from 'react-native';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const checkProductQuantity = (product:any,cartProduct:any) => {
  try {
    const {product_id,product_total_qty} = product;
    const cartItem  = cartProduct.filter(cart => cart?.product_id == product_id);
    const {qty} = cartItem[0];
    
    if(product_total_qty > qty){
        return true;
        
    }else{
        return false;
        
    }
  } catch (error) {
    console.log(error);
    
  }
}



export const CustomAlert = ({ visible, title, productName,productQty, onClose }:any) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>
          Only <Text style={{fontWeight:"bold",color:"red"}}>{productQty}</Text> quantity is available in stock for <Text style={{fontWeight:"bold",color:"red"}}>{productName}</Text>. Please order as soon as possible to avoid it going out of stock.
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};




const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: 'rgba(0, 0, 0, 0.04)',
     
    },
    modalView: {
    backgroundColor:"#Fff",
      borderRadius: 7,
      padding: 20,
      alignItems: 'center',
      width: '90%',
      elevation:100,
      borderColor:"#F0F0F0",
      borderWidth:2
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    highlight: {
      color: 'red',
      fontWeight: 'bold',
    },
    closeButton: {
      marginTop: 10,
      paddingHorizontal: 20,
      backgroundColor: 'rgb(105,175,94)',
      borderRadius: 5,
      paddingVertical:5
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontWeight:"bold"
    },
  });