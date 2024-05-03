import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'

type Props = {
    item: {
        name: string;
        imgUrl: string;
    }
}

const SearchSubCategory = ({ item }: Props) => {
    return (
        <TouchableOpacity style={styles.body}>
            <View>
                <Image style={{ width: 50, height: 50 }} resizeMode='center' source={{ uri: item.imgUrl }} />
            </View>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default SearchSubCategory

const styles = StyleSheet.create({
    body: {
        width: 200,
        height: 50,
        // margin:10,
        backgroundColor: '#ffffff',
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal:20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    }
})