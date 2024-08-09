// import { View, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
// import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// // import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

// const Help = () => {
//     const [count, setCount] = useState(1);
//     const [arr, setArr] = useState([1]);
//     const [time,setTime] = useState([]);
//     // const arr = [1];

//     const currentDate = new Date();

//     // Extract hours, minutes, and seconds
//     const hours = currentDate.getHours();
//     const minutes = currentDate.getMinutes();
//     const seconds = currentDate.getSeconds();

//     // Format time to ensure two digits for each part
//     const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

//     const handleEmail = (email) => {
//         Linking.openURL(`mailto:${email}`);
//     }

//     const handleChatWithUs = () => {
//         console.log("chat with us");
//         const newArr = [...arr];
//         newArr.push(count + 1);
//         setArr(newArr)
//         const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
//         const updateTime = [...time];
//         console.log("phele",updateTime);
        
//         updateTime.push(formattedTime);
//         console.log(updateTime);
//         setTime(updateTime);
//     }

//     useEffect(() => {
//         const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
//         const arr = [];
//         arr.push(formattedTime);
//         setTime(arr);
//         console.log("useEffect",arr);
        
        
//     },[])

//     return (
//         <View>
//             <View style={{height:"97%"}}>
//             <ScrollView style={{ marginBottom: 20, minHeight: "98%", backgroundColor: "white"}}>
//                 <View style={{ width: "100%", minHeight: "100%", backgroundColor: "white" }} key={count}>
//                     {arr.map((count,index) => <View key={index} ><Text style={{ width: "100%", textAlign: "center", paddingVertical: 20, fontSize: 15, fontWeight: 500 }}>Today</Text>
//                         <View style={{ width: 300, height: "auto", backgroundColor: "rgb(237,247,252)", justifyContent: "flex-start", alignItems: "center", marginHorizontal: 10, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 5 }}>
//                             <View style={{ justifyContent: "flex-start", width: "100%", paddingTop: 5, paddingLeft: 10, paddingBottom: 2 }}>
//                                 <Text style={{ fontSize: 20, fontWeight: 500 }}>Support</Text>
//                             </View>
//                             <View style={{ justifyContent: "flex-start", width: "100%", paddingBottom: 2, paddingLeft: 10 }}>
//                                 <Text style={{ fontSize: 15, lineHeight: 20 }}>Please write to us at{"\n"}<Text style={{ textDecorationLine: "underline" }} onPress={() => handleEmail("orders@flinkit.com")}>orders@flinkit.com</Text> for any {"\n"}queries. Please mention your order ID and issue description in your email along with pictures of the food, if applicable. Our team will look into your issue and revert within 72 hours</Text>
//                             </View>
//                             <View style={{ width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
//                                 <Text style={{ fontWeight: "500", padding: 5 }}>{time[index]}</Text>
//                             </View>
//                         </View>
//                         <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 10, flexDirection: "row" }}>
//                             <View style={{ backgroundColor: "lightyellow", justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, gap: 5 }}>
//                                 <Entypo name="check" style={{ width: 20, height: 20, backgroundColor: "green", color: "white", textAlign: "center", borderRadius: 5, paddingTop: 3 }} />
//                                 <Text style={{ textAlign: "center", fontWeight: "bold", backgroundColor: "lightyellow", fontSize: 13 }}>This conversation has been closed</Text>
//                             </View>
//                         </View>
//                     </View>
//                     )}
//                 </View>
//             </ScrollView>
//             </View>
//             <View style={{
//                 position:"absolute",
//                 bottom:0,
//                 justifyContent:"center",
//                 alignItems:"center",
//                 width:"100%"
//             }}>
//                 <TouchableOpacity>
//                 <Text style={{
//                     textAlign: 'center',
//                     fontWeight: 'bold',
//                 }}>
//                     Still having an issue?{' '}
//                     <Text style={{ color: "red" }} onPress={handleChatWithUs}>
//                         Chat with us
//                     </Text>
//                 </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default Help;



import React, { useState, useEffect } from "react";
import { View, Text, Linking, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Help = () => {
    const [count, setCount] = useState(1);
    const [arr, setArr] = useState([1]);
    const [time, setTime] = useState([]);

    const windowWidth = Dimensions.get("window").width;

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const handleEmail = (email:any) => {
        Linking.openURL(`mailto:${email}`);
    }

    const handleChatWithUs = () => {
        const newArr = [...arr];
        newArr.push(count + 1);
        setArr(newArr);

        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        const updateTime = [...time];
        updateTime.push(formattedTime);
        setTime(updateTime);
    }

    useEffect(() => {
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        const arr = [];
        arr.push(formattedTime);
        setTime(arr);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "white" }}>
                {arr.map((count, index) => (
                    <View key={index} style={{ marginHorizontal: 10, marginVertical: 5 }}>
                        <Text style={{ width: "100%", textAlign: "center", paddingVertical: 20, fontSize: 15 }}>Today</Text>
                        <View style={{ width: windowWidth - 20, backgroundColor: "rgb(237,247,252)", borderRadius: 10, padding: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: "500" }}>Support</Text>
                            </View>
                            <Text style={{ fontSize: 15, lineHeight: 20 }}>
                                Please write to us at{"\n"}
                                <Text style={{ textDecorationLine: "underline" }} onPress={() => handleEmail("orders@flinkit.com")}>orders@flinkit.com</Text>{" "}
                                for any queries. Please mention your order ID and issue description in your email along with pictures of the food, if applicable. Our team will look into your issue and revert within 72 hours.
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 5 }}>
                                <Text style={{ fontWeight: "500", padding: 5 }}>{time[index]}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                            <View style={{ backgroundColor: "lightyellow", flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, alignItems: "center" }}>
                                <Entypo name="check" style={{ width: 20, height: 20, backgroundColor: "green", color: "white", borderRadius: 5, paddingTop: 3,alignItems:"center" }} />
                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 13, marginLeft: 5 }}>This conversation has been closed</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity onPress={handleChatWithUs}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', }}>
                        Still having an issue?{' '}
                        <Text style={{ color: "red" }}>Chat with us</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Help;
