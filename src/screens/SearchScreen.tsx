import { StyleSheet, Text, View, TextInput,ScrollView ,FlatList} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchSubCategory from '../components/SearchSubCategory';
import { CategoryData } from '../components/Category';
import SearchCard from '../components/SearchCard';

const SearchScreen = () => {
    return (
        <View>
            <ScrollView>
            <View style={{ backgroundColor: '#EEEEEE',padding:10, width: "100%", height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.searchBody}>
                    <TextInput style={{ width: "70%",height:25 }} placeholder='Search for products...' />
                    <View><Icon name="search" size={20} color="rgba(0, 0, 0, 0.459);" /></View>
                </View>
            </View>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={CategoryData}
                    renderItem={({ item }) => <SearchSubCategory item={item} />}
                    keyExtractor={item => item.id} />
                <View style={{ display: 'flex', flexDirection: 'row', gap: 15, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 10 }}>
                    {
                        CategoryData?.map((item) => <SearchCard key={item.id} item={item} />)
                    }
                </View>
          
                
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
        width:'100%',
    }
})