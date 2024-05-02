import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

type Props = {
    item: {
        name: string;
        imgUrl: string;
    }
}
 
const SearchCard = ({ item }: Props) => {
    return (
        <TouchableOpacity style={styles.body}>
            <View>
                <Image style={{ width: "100%", height: 110 }} resizeMode='contain' source={{ uri: item.imgUrl }} />
                <Text style={{margin:10,fontSize:15,color:'#6b6e6a',fontWeight:'600'}}>{item.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View >
                        <Text style={{textDecorationLine: 'line-through' ,fontSize:15,color:'#6b6e6a',fontWeight:'600'}}>₹ 500</Text>
                        <Text style={{fontSize:15,color:'#000000',fontWeight:'600'}}>₹ 400</Text>
                    </View>
                    <TouchableOpacity style={{padding:10,backgroundColor:'#b5e8ae',borderRadius:5,borderColor:"green",borderWidth:1}}>
                        <Text style={{color:'green'}}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchCard

const styles = StyleSheet.create({
    body: {
        width: '45%',
        height: 250,
        backgroundColor: "#ffffff",
        borderRadius:10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    }
})