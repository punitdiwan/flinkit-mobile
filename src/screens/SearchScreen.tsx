import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React,{useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchSubCategory from "../components/SearchSubCategory";
import { CategoryData } from "../components/Category";
import SearchCard from "../components/SearchCard";
import  Category  from "../components/Category";

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText) => {
    setText(inputText);
  };
  return (
    <View>
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            padding: 10,
            width: "90%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:'row',
            gap:10,
            marginLeft: 20,
          }}
        >
          <View style={styles.searchBody}>
            <View>
              <Icon name="search" size={25} color="rgba(0, 0, 0, 0.459);" />
            </View>
            <TextInput
              style={{ width: "70%", height: 25, marginRight: 75 }}
              placeholder="Search store"
              onChangeText={handleInputChange}
              value={text}
            />
          </View>
          <View >
            <TouchableOpacity onPress={()=>navigation.navigate('Filter')}>
            <Image
              source={require("../../assets/Group 6839.png")}
              style={{ width: 15, height: 15 }}
              />
              </TouchableOpacity>
          </View>
        </View>
        

        
        {
          text == "" ? <Category/>:
            
            <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 10,
          }}
        >
          {CategoryData?.map((item) => (
            <SearchCard key={item.id} item={item} />
          ))}
        </View>
        }
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBody: {
    // borderWidth:1,
    // borderColor:'#00000048',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#EEEEEE",
  },
});
