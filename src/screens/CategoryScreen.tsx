import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoryData } from '../components/Category'

const CategoryScreen = () => {
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <View style={{ width: "20%", height: "auto" }}>
          <ScrollView style={{ padding: 5 }} showsVerticalScrollIndicator={false}>
            {
              CategoryData.map((item, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: '#ffffff', marginVertical: 5, borderRadius: 5 }}>
                  <Image source={{ uri: item.imgUrl }} resizeMode='contain' style={{ width: "100%", height: 100 }} />
                  <Text style={{ textAlign: "center", fontSize: 10 }}>{item.name}</Text>
                </TouchableOpacity>
              ))
            }

          </ScrollView>
        </View>
        <View style={{  width: "80%", height: "auto" }}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 15, justifyContent: 'center', flexWrap: 'wrap', paddingTop:10 }}>
              {
                CategoryData?.map((item,index)=>(
                  <TouchableOpacity key={index} style={{
                    width: '45%', backgroundColor: '#ffffff', height: 200, overflow: 'hidden', padding: 10, borderRadius: 15, shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}>
                    <View>
                      <Image source={{ uri: item.imgUrl }} resizeMode='contain' style={{ width: "100%", height: 100 }} />
                    </View>
                    <Text >{item.name}</Text>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={{ textDecorationLine: 'line-through' }}>500</Text>
                        <Text>400</Text>
                      </View>
                      <TouchableOpacity style={{ backgroundColor: '#c3e3c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 8 }}><Text style={{ color: 'green' }}>ADD</Text></TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              }
              <TouchableOpacity style={{
                width: '45%', backgroundColor: '#ffffff', height: 200, overflow: 'hidden', padding: 10, borderRadius: 15, shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
                <View>
                  <Image source={{ uri: CategoryData[0].imgUrl }} resizeMode='contain' style={{ width: "100%", height: 100 }} />
                </View>
                <Text >{CategoryData[0].name}</Text>
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ textDecorationLine: 'line-through' }}>500</Text>
                    <Text>400</Text>
                  </View>
                  <TouchableOpacity style={{ backgroundColor: '#c3e3c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 8 }}><Text style={{ color: 'green' }}>ADD</Text></TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({})