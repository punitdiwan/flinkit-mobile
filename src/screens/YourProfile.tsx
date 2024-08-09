import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View,Image, TextInput, TouchableOpacity} from 'react-native'
import { getUserDetails } from './supabaseClient';

const userImage = "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"

const YourProfile = () => {
  const navigation = useNavigation();

  const [image,setImage] = useState("");
  const [hidePassword,setHidePassword] = useState(true);
  const [user,setUser] = useState("");
  const {fullname,mobile} = user;
  
  console.log("image",image);
  
  const getProfile = async () => {
    const user = await AsyncStorage.getItem("userMobileNumber");
    const response = await getUserDetails(user);
    setUser(response[0])
  }
   
  useEffect(() => {
    getProfile();
    setImage(userImage);
  },[])

  return (
    <View style={{minHeight:"100%",width:"100%",paddingTop:100,paddingHorizontal:5,backgroundColor:"white"}}>
      {/* card container  */}
      <View style={{backgroundColor:"white",height:500,alignItems:"center",borderRadius:10,paddingVertical:20,gap:20}}>
        {/* image container first conatiner of card */}
          <View style={{width:140,height:140,backgroundColor:"rgb(240,241,242)",borderRadius:100,justifyContent:"center",alignItems:"center",elevation:2}}>
             {image ? <Image source={{uri:userImage}} style={{width:138,height:138,borderRadius:100}}/>  : ""}
          </View>

          {/* second container of card  */}
          <View style={{marginVertical:20,width:"100%",paddingHorizontal:5,gap:10}}>
            {/* first container of second conatiner */}
          <View style={{backgroundColor:"rgb(240,241,242)",alignItems:"center",flexDirection:"row",paddingHorizontal:10,gap:15,paddingVertical:10,borderRadius:5,width:"100%",height:60}}>
            <View>
              <Image source={require("../../assets/person.png")} style={{width:20,height:20}}/>
            </View>
            <View style={{display:"flex",justifyContent:"center"}}>
              <View>
                <Text style={{fontWeight:500,fontSize:15}}>Full Name</Text>
              </View>
              <View>
                <Text>Amit Sharma</Text>
              </View>
            </View>
          </View>
 
          {/* second container of card container */}
           {/* <View style={{width:"100%",paddingHorizontal:10,height:60,backgroundColor:"rgb(240,241,242)",justifyContent:"space-between",flexDirection:"row",alignItems:"center",borderRadius:5}}>
                <View style={{flexDirection:"row",alignItems:"center",gap:15}}>
                  <Image source={require("../../assets/lock.png")} style={{width:20,height:20}}/>
                  <View>
                    <Text style={{fontWeight:500}}>Password</Text>
                    <TextInput value='Harsh' secureTextEntry={hidePassword} readOnly style={{color:"black"}}/>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <Image source={require("../../assets/hidepassword.png")} style={{width:20,height:20}}/> : <Image  source={require("../../assets/showpassword.png")} style={{width:20,height:20}}/>}
                </TouchableOpacity>
           </View> */}

               {/* third container of card container */}
               <View style={{width:"100%",paddingHorizontal:10,height:60,backgroundColor:"rgb(240,241,242)",justifyContent:"space-between",flexDirection:"row",alignItems:"center",borderRadius:5}}>
                <View style={{flexDirection:"row",alignItems:"center",gap:15}}>
                  <Image source={require("../../assets/lock.png")} style={{width:20,height:20}}/>
                  <View>
                    <Text style={{fontWeight:500}}>Phone</Text>
                    <Text>{mobile}</Text>
                  </View>
                </View>
           </View>
           
          </View>

          <View style={{width:"100%",justifyContent:"center"}}>
           <TouchableOpacity style={{width:"100%",justifyContent:"center",paddingVertical:15,alignItems:"center",borderRadius:10,borderWidth:1,borderColor:"rgb(105,175,94)",backgroundColor:"rgb(105,175,94)"}} onPress={() => navigation.navigate("EditProfile")}>
                <Text style={{fontWeight:500,fontSize:15,alignItems:"center",color:"white"}}>Update Profile</Text>
           </TouchableOpacity>
           </View>


      </View>
    </View>
  )
}

export default YourProfile