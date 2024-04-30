import { StyleSheet, Text, View, TextInput,ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
    return (
        <View>
            <View style={{ backgroundColor: '#EEEEEE',padding:10, width: "100%", height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.searchBody}>
                    <TextInput style={{ width: "70%",height:25 }} placeholder='Search for products...' />
                    <View><Icon name="search" size={20} color="rgba(0, 0, 0, 0.459);" /></View>
                </View>
            </View>
            <ScrollView>
                
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchBody:{
        borderWidth:1,
        borderColor:'#00000048',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:15,
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:10,
        width:'100%'
    }
})