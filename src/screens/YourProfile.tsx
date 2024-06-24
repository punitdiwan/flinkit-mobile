import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const YourProfile = () => {
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");

    const handleName = (name) => {
        setName(name);
    }
  
    const handleEmail = (email) => {
        setEmail(email);
    }

    const handleNumber = (number) => {
        setNumber(number);
    }

    const handleAddress = (address) => {
        setAddress(address)
    }

    const handleSubmit = () => {
        console.log(name,number,email,address);
        setName("");
        setNumber("");
        setEmail("");
        setAddress("");
        
    }

    return (
        <View style={{width:"100%",minHeight:"100%",backgroundColor:"#f7f3f2",justifyContent:"center",alignItems:"center",paddingHorizontal:5}}>
        <View style={{ width: "100%",height:"auto",paddingVertical:50,paddingHorizontal:10,backgroundColor:"white",borderRadius:10}}>
            <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginBottom:10}}>
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "rgb(105,175,94)", justifyContent: "center", alignContent: "center",alignItems:"center"}}><Text style={{fontWeight:"bold",color:"white",fontSize:20}}>H</Text></View>
            </View>
            <View style={{marginBottom:10,borderBottomWidth:1,borderColor:"rgb(105,175,94)",paddingHorizontal:10,paddingVertical:10,borderRadius:10}}>
                <TextInput placeholder="Enter your Name" placeholderTextColor={"rgb(183,183,183)"} value={name} onChangeText={handleName} keyboardType={"default"} style={{fontWeight:"bold"}}/>
            </View>
            <View style={{marginBottom:10,borderBottomWidth:1,borderColor:"rgb(105,175,94)",paddingHorizontal:10,paddingVertical:10,borderRadius:10}}>
                <TextInput placeholder="Enter your Number" placeholderTextColor={"rgb(183,183,183)"} value={number} onChangeText={handleNumber} keyboardType={"numeric"} style={{fontWeight:"bold"}}/>
            </View>
            <View style={{marginBottom:10,borderBottomWidth:1,borderColor:"rgb(105,175,94)",paddingHorizontal:10,paddingVertical:10,borderRadius:10}}>
                <TextInput placeholder="Enter your Email" placeholderTextColor={"rgb(183,183,183)"} value={email} onChangeText={handleEmail} keyboardType={"email-address"} style={{fontWeight:"bold"}}/>
            </View>
            <View style={{marginBottom:10,borderBottomWidth:1,borderColor:"rgb(105,175,94)",paddingHorizontal:10,paddingVertical:10,borderRadius:10}}>
                <TextInput placeholder="Enter your Address" placeholderTextColor={"rgb(183,183,183)"} value={address} onChangeText={handleAddress} keyboardType={"default"} style={{fontWeight:"bold"}}/>
            </View>
            <TouchableOpacity style={{width:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(105,175,94)",paddingVertical:15,borderRadius:10}} onPress={handleSubmit}>
                <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Update Profile</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

export default YourProfile;