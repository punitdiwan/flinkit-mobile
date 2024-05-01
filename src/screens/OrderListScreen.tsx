import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const OrderListScreen = (props: Props) => {
    return (
        <View style={{
            width: "100%", height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <View style={{ width: "100%", height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',padding:10}}>
                <Text style={{color:'#7a7a78',fontSize:20,fontWeight:'500',margin:10}}>No orders found.</Text>
                <Text style={{textAlign:'center',color:'#78766f',fontSize:15}}>Place your first order and make your shopping experience joyful!</Text>
            </View>
        </View>
    )
}

export default OrderListScreen

const styles = StyleSheet.create({})