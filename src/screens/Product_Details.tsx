import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import RupeeIcon from "react-native-vector-icons/FontAwesome6";
const Product_Details = ({ route }: any) => {
  const { name, imgUrl } = route.params;
  return (
    <View style={{padding:15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: imgUrl }} style={{ width: '100%', height: 300 }} resizeMode="cover" />
        </View>
        <View style={{ width: '100%', height: 'auto',marginVertical:10 }}>
          <Text style={{ color: '#5c5a5a', fontSize: 25, fontWeight: '700' }}>{name} Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, harum.</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 12 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <RupeeIcon name="indian-rupee-sign" style={{ fontSize: 15,color:'#616362' }} />
            <Text style={{ textDecorationLine: "line-through", fontSize: 15,color:'#616362' }}>150</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <RupeeIcon name="indian-rupee-sign" style={{ color: '#316e41', fontSize: 20 }} />
            <Text style={{ color: '#316e41', fontSize: 20, fontWeight: "400" }}>140</Text>
          </View>
          <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#316e41', borderRadius: 25 }}>
            <Text style={{ color: '#ffffff', fontWeight: '500', }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 30, width: '100%', height: 0.5, backgroundColor: '#919993' }}></View>
        <View style={{display:'flex',gap:15}}>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Brand</Text>
            <Text style={{color:'#616362'}}>Amul</Text>
          </View>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Shelf life</Text>
            <Text style={{color:'#616362'}}>6 months</Text>
          </View>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Description</Text>
            <Text style={{color:'#616362'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum incidunt, molestias placeat cupiditate iste amet autem recusandae soluta quaerat corporis? Porro tenetur laboriosam asperiores modi, saepe esse voluptas perferendis autem placeat temporibus, fugiat nisi nemo velit. Perspiciatis numquam autem quasi?</Text>
          </View>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Unit</Text>
            <Text style={{color:'#616362'}}>200g</Text>
          </View>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Key Features</Text>
            <Text style={{color:'#616362'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, doloribus?</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Product_Details;
const styles = StyleSheet.create({

});
