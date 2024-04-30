import { StyleSheet, Text, View, ScrollView, Button, Alert,FlatList } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App';


type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>




const Profile = ({ route }: ProfileProps) => {
  const { userId } = route.params
  return (
    <View style={{ width: '100%', height: "100%", backgroundColor: "#fffff" }}>
      <View style={{ width: "100%", height: "auto" }}>
        <Text style={{ fontSize: 26, fontWeight: "600", margin: 15 }}>Saved Addresses </Text>
      </View>
      <View style={{ width: "100%", height: 500, padding: 15 }}>
        <ScrollView>
         
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 15, display: 'flex', gap: 15 }}>
        <Button
          title="Your orders"
          color="#57a336"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
        <Button
          title="Logout"
          color="#57a336"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})