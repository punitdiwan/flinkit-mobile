import { useState } from "react";
import { Image } from "react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const YourProfile = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

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
        console.log(name, number, email, address);
        setName("");
        setNumber("");
        setEmail("");
        setAddress("");

    }

    const ProfileImag =
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <View style={{ width: "100%", minHeight: "100%",backgroundColor:"red"}}>
            <View style={{ width: "100%", height: "auto", paddingVertical: 50, paddingHorizontal: 10, backgroundColor: "white",minHeight:"100%" }}>
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                    <View style={{ width: 150, height: 150, borderRadius: 100, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <Image
                            source={{ uri: ProfileImag }}
                            resizeMode="cover"
                            style={{ width: 150, height:150, borderRadius:100 }}
                        />
                    </View>
                </View>
                <View style={{ borderColor: "rgb(105,175,94)", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
                    <TextInput placeholder="Enter your Name" placeholderTextColor={"rgb(183,183,183)"} value={name} onChangeText={handleName} keyboardType={"default"} style={{ fontWeight: "bold",backgroundColor:"rgb(240,241,242)",padding:20,borderRadius:10 }} />
                </View>
                <View style={{borderColor: "rgb(105,175,94)", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
                    <TextInput placeholder="Enter your Number" placeholderTextColor={"rgb(183,183,183)"} value={number} onChangeText={handleNumber} keyboardType={"numeric"} style={{ fontWeight: "bold",backgroundColor:"rgb(240,241,242)",padding:20,borderRadius:10 }} />
                </View>

                <TouchableOpacity style={{ width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(105,175,94)", paddingVertical: 15, borderRadius: 10 }} onPress={handleSubmit}>
                    <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default YourProfile;