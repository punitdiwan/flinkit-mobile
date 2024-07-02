import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const YourProfile = () => {
  const [name, setName] = useState("Harsh Sharma");
  const [number, setNumber] = useState("8457689765");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("mypassword");
  const [hidePassword, setHidePassword] = useState(true);
  const [updateProfile, setUpdateProfile] = useState(false);

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

//   image picker

  const ProfileImag =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const navigation = useNavigation();

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
        <Image
          source={{ uri: ProfileImag }}
          resizeMode="cover"
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            marginBottom: 40,
          }}
        />
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: "rgb(105,175,94)",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 120,
            right: 150,
          }}
          onPress={() => {
            navigation.navigate("UploadImage")
          }}
        >
          <Image
            source={require("../../assets/camera.png")}
            style={{ padding: 10, width: 10, height: 20 }}
         
          />
        </TouchableOpacity>

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

//  <View style={{flexDirection:"row",gap:20,alignItems:'center'}}>
// <Image source={require("../../assets/lock.png")}/>
// <View style={{width:"auto"}}>
//     <Text style={{color:"#171825",fontWeight:"bold"}}>Password</Text>
//     <Image source={require("../../assets/fullstop.png")} style={{width:30,height:30}}/>

// </View>
// </View>
// <Image source={require("../../assets/password.png")}/>
