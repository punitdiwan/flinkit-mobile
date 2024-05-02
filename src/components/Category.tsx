import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useMyContext } from '../context/Context'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'

export const CategoryData = [
    {   
        id:'1wdsqx',
        name: "Vegetables & Fruits",
        imgUrl: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
        bg: "#e6d29c"
    },
    {   
        id:'2aqwd',
        name: "Dairy & Breakfast",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
        bg: "#eaedaf"
    },
    {   
        id:'3wd',
        name: "Munchies",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
        bg: '#ebc5ae'
    },
    {   
        id:'4qawd',
        name: "Cold Drinks & Juices",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
        bg: '#b7d8ed'
    },
    {    id:'15awdq',
        name: "Instant & Frozen Food",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
        bg: '#b299d1'
    },
    {    id:'16awd',
        name: "Bakery & Biscuits",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/888_1688712847171.png",
        bg: '#db93ba'
    },
    {    id:'17sd',
        name: "Sweet Tooth",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/9_1693202755712.png",
        bg: '#97d3db'
    },
    {    id:'18vs',
        name: "Atta, Rice & Dal",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/16_1670926686695.png",
        bg: '#5c6e70'
    },
    {    id:'19fg',
        name: "Cleaning Essentials",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/18_1692167327246.png",
        bg: '#798e91'
    },
    {    id:'1245',
        name: "Personal Care",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/163_1698986628342.png",
        bg: '#bddbc6'
    },
    {    id:'111',
        name: "Vegetables & Fruits",
        imgUrl: "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
        bg: "#e6d29c"
    },
    {    id:'125',
        name: "Dairy & Breakfast",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
        bg: "#eaedaf"
    },
    {    id:'178',
        name: "Munchies",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
        bg: '#ebc5ae'
    },
    {    id:'1895',
        name: "Cold Drinks & Juices",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
        bg: '#b7d8ed'
    },
    {    id:'185',
        name: "Instant & Frozen Food",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
        bg: '#b299d1'
    },
    {    id:'189',
        name: "Instant & Frozen Food",
        imgUrl: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
        bg: '#b299d1'
    },
]


const Category = () => {
    const{setcategoryname}=useMyContext();
    const navigation = useNavigation<any>();
    
    const setCategoryName = async(name: string)=>{
        console.log(name)
        navigation.navigate("CategoryScreen")
    }

    return (
        <>
            <View style={{ padding: 10 }}>
                <View style={{paddingLeft:10 ,marginVertical:25}}>
                    <Text style={{fontSize:25,fontWeight:'600'}}>Shop by Category</Text>
                </View>
                <View style={{display:"flex",flexDirection:'row',flexWrap:'wrap',gap:10,alignItems:'center',justifyContent:'center'}}>
                {
                    CategoryData?.map((item,index)=>(
                        <TouchableOpacity onPress={()=>setCategoryName(item.name)} key={index} style={styles.cardBody}>
                        <View style={[styles.imgBody,{backgroundColor:`${item.bg}`}]}>
                            <Image style={{width:"100%",height:"100%"}} source={{ uri: item.imgUrl }} />
                        </View>
                        <View >
                            <Text style={{textAlign:"center",fontSize:15,fontStyle:'normal',fontWeight:"500"}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                    ))
                }
                </View>
            </View>
        </>
    )


}

export default Category

const styles = StyleSheet.create({
    cardBody: {
        width: 100,
        height: 150,
        // backgroundColor: "pink",
        display: 'flex',
        alignItems:"center",
        padding:2,
        overflow:"hidden"
        // justifyContent:"center"
    },
    imgBody:{
        width:"100%",
        height:100,
        // backgroundColor:"#666666",
        borderRadius:20,
        padding:7,
    }
})