// import React, { useEffect, useLayoutEffect } from 'react';
// import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useMyContext } from '../context/Context';
// // import * as SplashScreen  from 'expo-splash-screen';
// // import * as Font from 'expo-font';


// const Onboarding = () => {
//   const navigation = useNavigation();
//   const {userId,setUserId} = useMyContext();
//   console.log("Onboard",userId);
  

 
//   const checkIsLoggedIn = async () => {
//     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true' ) {
//       navigation.navigate('BottomNav');
//     } else {
//       navigation.navigate('Onboarding');
//     }
//   };




//   useEffect(() => {
//     checkIsLoggedIn();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="black" />
//       <ImageBackground source={require("../../assets/homeImage.png")} resizeMode="cover" style={styles.image}>
//         <LinearGradient colors={['#0A40', '#0A4500', '#0A4500']} style={styles.containerStyle}>
//           <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "auto" }}>
//               <Text style={{ textAlign: "center", color: "white", fontSize: 50, fontFamily: "Gilroy-Semibold" }}>Welcome{"\n"}to Santheyyy</Text>
//             </View>
//           </View>

//           <View style={{ width: '100%', marginBottom: 65 }}>
//             <Text style={{ color: '#AAAAAA', fontSize: 16, textAlign: "center",fontFamily:"Gilroy-Medium" }}>
//               Get your groceries in as fast as 15 mins
//             </Text>
//           </View>

//           <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginLeft: 20 }}>
//             <TouchableOpacity onPress={() => navigation.replace("Signin")} style={styles.otpBtn}>
//               <Text style={{ color: '#ffffff', fontSize: 18,fontFamily:"Gilroy-Semibold" }}>Get Started</Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   otpBtn: {
//     width: 353,
//     height: 68,
//     backgroundColor: "rgb(105,175,94)",
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//     marginRight: 37,
//     marginBottom: 700,
//     elevation: 10
//   },
//   containerStyle: {
//     backgroundColor: 'linear-gradient(to bottom, rgb((8,56,1)), rgb((10,69,0))), url(${backgroundImage})',
//     color: 'white',
//     marginTop: 700
//   }
// });

// export default Onboarding;
// import React, { useEffect } from 'react';
// import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useMyContext } from '../context/Context';

// // Get screen dimensions
// const { width, height } = Dimensions.get('window');

// const Onboarding = () => {
//   const navigation = useNavigation();
//   const { userId, setUserId } = useMyContext();
//   console.log("Onboard", userId);

//   const checkIsLoggedIn = async () => {
//     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       navigation.navigate('BottomNav');
//     } else {
//       navigation.navigate('Onboarding');
//     }
//   };

//   useEffect(() => {
//     checkIsLoggedIn();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <ImageBackground 
//         source={require("../../assets/homeImage.png")} 
//         resizeMode="cover" 
//         style={styles.image}
//       >
//         <LinearGradient colors={['#0A40', '#0A4500', '#0A4500']} style={styles.gradient}>
//           <View style={styles.contentContainer}>
//             <View style={styles.textContainer}>
//               <Text style={styles.title}>Welcome{"\n"}to Santheyyy</Text>
//               <Text style={styles.subtitle}>Get your groceries in as fast as 15 mins</Text>
//               <TouchableOpacity 
//                 onPress={() => navigation.replace("Signin")} 
//                 style={styles.otpBtn}
//               >
//                 <Text style={styles.buttonText}>Get Started</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </LinearGradient>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black', // Ensure a consistent background color
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'flex-end', // Align content to the bottom
//     paddingHorizontal: '5%',
//     paddingBottom: height * 0.05,
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'flex-end', // Align content to the bottom
//     paddingHorizontal: '5%',
//     paddingBottom: height * 0.1, // Adjusted to create more space at the bottom
//   },
//   textContainer: {
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: "center",
//     color: "white",
//     fontSize: width * 0.1, // Adjusted for better scaling
//     fontFamily: "Gilroy-Semibold",
//     marginBottom: 20, // Added margin for spacing
//     textShadowColor: 'rgba(0, 0, 0, 0.5)', // Add shadow for better readability
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 4,
//   },
//   subtitle: {
//     color: '#AAAAAA',
//     fontSize: width * 0.05, // Responsive font size
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//     marginBottom: height * 0.05, // Adjust spacing between subtitle and button
//   },
//   otpBtn: {
//     width: '100%', // Full width within padding constraints
//     maxWidth: width * 0.9, // Max width for larger screens
//     height: height * 0.08, // Responsive height
//     backgroundColor: "rgb(105,175,94)",
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//     elevation: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: width * 0.05, // Responsive font size
//     fontFamily: "Gilroy-Semibold",
//   }
// });

// export default Onboarding;


import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMyContext } from '../context/Context';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useMyContext();
  console.log("Onboard", userId);

  const checkIsLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigation.navigate('BottomNav');
    } else {
      navigation.navigate('Onboarding');
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ImageBackground 
        source={require("../../assets/homeImage.png")} 
        resizeMode="cover" 
        style={styles.image}
      >
        <LinearGradient 
          colors={['rgba(10, 69, 0, 0)','rgba(10, 68, 0, 1)']} 
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome{"\n"}to Santheyyy</Text>
              <Text style={styles.subtitle}>Get your groceries in as fast as 15 mins</Text>
              <TouchableOpacity 
                onPress={() => navigation.replace("Signin")} 
                style={styles.otpBtn}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Ensure a consistent background color
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    paddingHorizontal: '5%',
    paddingBottom: height * 0.05,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    paddingHorizontal: '5%',
    paddingBottom: height * 0.1, // Adjusted to create more space at the bottom
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: width * 0.1, // Adjusted for better scaling
    fontFamily: "Gilroy-Semibold",
    marginBottom: 20, // Added margin for spacing
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Add shadow for better readability
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: width * 0.05, // Responsive font size
    textAlign: "center",
    fontFamily: "Gilroy-Medium",
    marginBottom: height * 0.05, // Adjust spacing between subtitle and button
  },
  otpBtn: {
    width: '100%', // Full width within padding constraints
    maxWidth: width * 0.9, // Max width for larger screens
    height: height * 0.08, // Responsive height
    backgroundColor: "rgb(105,175,94)",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.05, // Responsive font size
    fontFamily: "Gilroy-Semibold",
  }
});

export default Onboarding;







