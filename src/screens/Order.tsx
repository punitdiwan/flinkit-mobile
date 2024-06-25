import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import { loadOrders } from "./supabaseClient"
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

const Item = ({ props }) => {
  console.log(props);

  return (
    <View style={{ backgroundColor: "#d1d1d1", flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginVertical: 5, height: 100, alignItems: "center", borderRadius: 10 }}>
      <View>
        <Image source={{
          uri: props?.product_image,
        }} width={70} height={70} style={{ borderRadius: 10 }} />
      </View>
      <View style={{ width: "50%" }}>
        <Text style={{ fontSize: 17, fontWeight: 500 }}>{props?.productname}</Text>
      </View>
    </View>
  )
}


const Order = () => {
  const [order, setOrder] = useState([]);
  const [trackOrder, setTrackOrder] = useState(false);

  const navigation = useNavigation();
  const loadOrder = async () => {
    const orderData = await loadOrders();
    console.log(orderData)
    setOrder(orderData);
  }

  useEffect(() => {
    loadOrder();
  }, [])
  return (
    <View style={{ width: "100%", minHeight: "100%", justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
      <FlatList
        data={order}
        renderItem={({ item }) => <Item props={item} />}
      // keyExtractor={item => item.id}
      />
      <View style={{ position: "absolute", bottom: 50, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <TouchableOpacity style={{ backgroundColor: "rgb(105,175,94)", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 15, borderRadius: 10 }} onPress={() => setTrackOrder(true)}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Track Order</Text>
        </TouchableOpacity>
      </View>
      {trackOrder && <View style={{ position: "absolute", height: "80%", backgroundColor: "white", width: "100%", bottom: 0, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 }}>
        <View>
          <Entypo name="cross" style={{ position: "absolute", right: 10, top: 10 }} size={30} onPress={() => setTrackOrder(!trackOrder)}  /> 
        </View>
  
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Your Order</Text>
      </View>}
    </View>
  )
}

export default Order