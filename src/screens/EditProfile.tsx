import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";



const EditProfile = () => {
  const [name, setName] = useState("Harsh Sharma");
  const [number, setNumber] = useState("8457689765");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("mypassword");
  const [hidePassword, setHidePassword] = useState(true);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [image, setImage] = useState(null);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  //   validate from and save details
  const handleEdit = () => {
    if (name == "" || password == "" || number == "") {
      handleMsgAlert("Invalid", "Fileds never be empty");
    } else if (number.length !== 10) {
      handleMsgAlert("Invalid", "Number must be contain 10 digit");
    } else {
      setUpdateProfile(!updateProfile);
    }
  };

  //    handling alert through out the component
  const handleMsgAlert = (title: any, message: any) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("Press ok") }],
      { cancelable: true }
    );
  };


  const navigation = useNavigation();

  // for image picker
  const addImage = async () => {
    console.log("open manager");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        minHeight: "100%",
        width: "100%",
        backgroundColor: "rgb(255,255,255)",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          height: "500",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          borderRadius: 50,
          gap: 10,
        }}
      >
        <View>
        <View style={style.container}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 138, height: 138 }}
            />
          ) : <Image source={require("../../assets/personn.png")} style={{width:160,height:160}} /> }
        </View>

        <View style={style.uploadBtnContainer}>
          <TouchableOpacity onPress={() => {
            if(updateProfile){
              addImage();
            }else{
              handleMsgAlert("Alert","Please click on the update profile button to update your profile image")
            }
            
          }} style={style.uploadBtn}>
            {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
            {/* <AntDesign name="camera" size={20} color="black" /> */}
            <Image source={require("../../assets/camerra.png")} style={{width:20,height:20,padding:1,  filter: 'grayscale(200%)'}}/>
          </TouchableOpacity>
        </View>
        </View>

        <View
          style={{
            backgroundColor: "rgb(240,241,242)",
            width: "100%",
            gap: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../../assets/person.png")}
            style={{ height: 20, width: 20 }}
          />
          <View style={{ width: "100%" }}>
            <Text style={{ color: "#171825", fontWeight: "bold" }}>
              Full Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              // secureTextEntry={hidePassword}
              value={name}
              onChangeText={(text) => setName(text)}
              editable={updateProfile}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "rgb(240,241,242)",
            width: "100%",
            gap: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Image
              source={require("../../assets/lock.png")}
              style={{ width: 20, height: 20 }}
            />
            <View style={{ width: "80%" }}>
              <Text style={{ color: "#171825", fontWeight: "bold" }}>
                Password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
                editable={updateProfile}
              />
            </View>
          </View>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {hidePassword ? (
              <Image
                source={require("../../assets/showpassword.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../../assets/hidepassword.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "rgb(240,241,242)",
            width: "100%",
            gap: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            borderRadius: 10,
            paddingVertical: 10,
          }}
        >
          <Image
            source={require("../../assets/phone.png")}
            style={{ height: 20, width: 20 }}
          />
          <View style={{ width: "100%" }}>
            <Text style={{ color: "#171825", fontWeight: "bold" }}>
              Phone Number
            </Text>
            <TextInput
              // autoFocus={true}
              style={styles.input}
              placeholder="Enter your password"
              // secureTextEntry={hidePassword}
              value={number}
              onChangeText={(text) => setNumber(text)}
              //  editable={!updateProfile && readOnly}
              editable={updateProfile}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {updateProfile ? (
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(105,175,94)",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 10,
            }}
            onPress={() => {
              handleEdit();
              // setUpdateProfile(!updateProfile);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(105,175,94)",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 10,
            }}
            onPress={() => {
              setUpdateProfile(!updateProfile);
              handleMsgAlert(
                "Edit Profile",
                "Please click on the filed which you want to update"
              );
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  input: {
    // flex: 1,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    color: "black",
    // backgroundColor:"red",
    // height:40
    paddingVertical: 2,
  },
  toggleButton: {
    padding: 10,
  },
});

export default YourProfile;

const style = StyleSheet.create({
  container: {
    elevation: 2,
    height: 138,
    width: 138,
    // backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"rgb(240,241,242)",
    borderColor:"rgb(105,175,94)",
    padding:2
  },
  uploadBtnContainer: {
    // opacity: 0.7,
    position: "absolute",
    right:5,
    bottom: 10,
    backgroundColor: "rgb(105,175,94)",
    borderRadius:100,
    display: "flex",
    width:33,
    height:33,
    justifyContent:"center",
    alignItems:"center",
    zIndex:10,
    borderWidth:1,
    borderColor:'rgb(105,175,94)'

  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"rgb(105,174,94)",
    width:18,
    height:18,
    borderRadius:100,
  },
});
