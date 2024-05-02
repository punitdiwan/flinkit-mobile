import { StyleSheet, Text, View,ImageBackground,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Login = (props: Props) => {
    const imgUrl="https://images.unsplash.com/photo-1541929866681-94eb7c9a4c7d?q=80&w=1603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const navigation =useNavigation<any>();
    return (
    <View style={styles.container}>
    <ImageBackground resizeMethod='resize' source={{uri:imgUrl}} resizeMode="cover" style={styles.image}>
      <View style={styles.text}>
        <View style={styles.inputBox}>
            <Text>+91</Text>
            <TextInput style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="79XXXXXXXX"
        keyboardType="numeric"
        maxLength={10}
        />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Otp")} style={styles.otpBtn}>
            <Text style={{color:'#ffffff',fontSize:20,fontWeight:'600'}}>Send OTP</Text>
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
  </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      text: {
        // backgroundColor: '#ffffff',
        marginBottom:150,
        width:"100%",
        height:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:30

      },
      input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        width:'70%'
      },
      inputBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        width:'80%',


        borderRadius:10
      },
      otpBtn:{
        width:"80%",
        height:45,
        backgroundColor:"green",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    }
})