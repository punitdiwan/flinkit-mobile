import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    info: {
        id: string;
        name: string;
        complateAddress: string;
        floor: string;
        landmark: string;
        phone: string;
    }
}

const AddressList = ({ info }: Props) => {
    return (
        <View style={styles.body}>
            {info.name && <Text style={{color:'#000000', marginLeft:50,}}> {info.name}</Text>}








            {/* {info.complateAddress && <Text style={{color:'#727375'}}>Complate Address : {info.complateAddress}</Text>}
            {info.floor && <Text style={{color:'#727375'}}>Floor : {info.floor}</Text>}
            {info.landmark && <Text style={{color:'#727375'}}>Landmark : {info.landmark}</Text>}
            {info.phone && <Text style={{color:'#727375'}}>Phone : {info.phone}</Text>} */}
            {/* <TouchableOpacity style={{ marginTop:5,backgroundColor:'#57a336', width:60,height:30,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                <Text style={{color:'#ffffff'}}>Delete</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default AddressList

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEEEEE',
        marginTop:10,
        padding:10,
    }
})