// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useMyContext } from '../context/Context';
// import { supabase } from './supabaseClient';
// import { checkProductQuantity, CustomAlert } from '../utils/CheckQuantity';
// import { imageUrl } from '../../lib/constant';
// import { Entypo } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const Item = ({ item }:any) => {
//   const { cartItem, addingItemInCart, decreaseCartQuantity, increaseCartQuantity } = useMyContext();
//   const navigation = useNavigation();
//   const [isAlertVisible, setIsAlertVisible] = useState(false);

//   const showAlert = () => setIsAlertVisible(true);
//   const closeAlert = () => setIsAlertVisible(false);

//   return (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Productdetail', {
//             id: item?.product_id,
//           })
//         }
//       >
//         <Image
//           style={styles.itemImage}
//           resizeMode="contain"
//           source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }}
//         />
//         <Text style={styles.itemName}>{item?.product_name}</Text>
//         <Text style={styles.itemDescription}>325ml, Price</Text>
//         <View style={styles.itemFooter}>
//           <Text style={styles.itemPrice}>₹{item?.price}</Text>
//           {item?.product_total_qty === 0 ? (
//             <View style={styles.outOfStockContainer}>
//               <Text style={styles.outOfStockText}>Out Of Stock</Text>
//             </View>
//           ) : cartItem.some(cartItem => cartItem?.product_id === item?.product_id) ? (
//             <View style={styles.quantityControls}>
//               <TouchableOpacity
//                 style={styles.controlButton}
//                 onPress={() => decreaseCartQuantity(item?.product_id)}
//               >
//                 <Entypo name="minus" size={20} color="#bab7b6" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.controlButton}>
//                 <Text style={styles.quantityText}>
//                   {cartItem.find(cartItem => cartItem?.product_id === item?.product_id)?.qty || 0}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.controlButton}
//                 onPress={() => {
//                   const response = checkProductQuantity(item, cartItem);
//                   if (response) {
//                     increaseCartQuantity(item?.product_id);
//                   } else {
//                     showAlert();
//                   }
//                 }}
//               >
//                 <Entypo name="plus" size={20} color="#69AF5D" />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => addingItemInCart(item)}
//             >
//               <Text style={styles.addButtonText}>+</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableOpacity>
//       {isAlertVisible && (
//         <CustomAlert
//           visible={isAlertVisible}
//           title="Out of Stock"
//           productName={`${item?.product_name}`}
//           productQty={`${item?.product_total_qty}`}
//           onClose={closeAlert}
//         />
//       )}
//     </View>
//   );
// };

// const CategoryScreen = ({ route }:any) => {
//   const { category_id } = route.params;
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from('newproducts')
//         .select('*')
//         .eq('category_id', category_id);
//       if (error) throw error;
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category_id]);

//   return (
//     <>
//       <StatusBar backgroundColor="white" barStyle="dark-content" />
//       <View style={styles.screenContainer}>
//         <FlatList
//           contentContainerStyle={styles.flatListContentContainer}
//           numColumns={2}
//           data={products}
//           renderItem={({ item }) => <Item item={item} />}
//           keyExtractor={(item) => item.product_id}
//           ListEmptyComponent={
//             !isLoading && (
//               <View style={styles.emptyContainer}>
//                 <Text style={styles.emptyText}>No Products</Text>
//               </View>
//             )
//           }
//         />
//         {isLoading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#000" />
//           </View>
//         )}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     margin: 5,
//     padding: 10,
//     borderRadius: 10,
//     borderColor: 'rgb(233,233,233)',
//     borderWidth: 1,
//     height: 270,
//     width: width * 0.45, // responsive width
//   },
//   itemImage: {
//     width: '100%',
//     height: 110,
//   },
//   itemName: {
//     fontSize: 16,
//     fontFamily: 'Gilroy-Bold',
//     color: 'rgb(38,37,50)',
//   },
//   itemDescription: {
//     paddingTop: 5,
//     color: 'rgb(205,205,205)',
//     fontFamily: 'Gilroy-Semibold',
//     fontSize: 14,
//   },
//   itemFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 18,
//     fontFamily: 'Gilroy-Semibold',
//     color: 'rgb(38,37,50)',
//   },
//   outOfStockContainer: {
//     backgroundColor: '#E3E3E3',
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//     borderRadius: 5,
//   },
//   outOfStockText: {
//     color: 'red',
//     fontWeight: '500',
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   controlButton: {
//     width: 30,
//     height: 30,
//     borderColor: '#bab7b6',
//     borderRadius: 5,
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 2,
//   },
//   quantityText: {
//     fontSize: 20,
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'rgb(105,175,93)',
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   flatListContentContainer: {
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontWeight: 'semibold',
//     fontSize: 20,
//     textDecorationLine: 'underline',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -25 }, { translateY: -25 }],
//   },
// });

// export default CategoryScreen;


import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/Context';
import { supabase } from './supabaseClient';
import { checkProductQuantity, CustomAlert } from '../utils/CheckQuantity';
import { imageUrl } from '../../lib/constant';
import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Memoized Item component
const Item = memo(({ item }:any) => {
  const { cartItem, addingItemInCart, decreaseCartQuantity, increaseCartQuantity } = useMyContext();
  const navigation = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => setIsAlertVisible(true);
  const closeAlert = () => setIsAlertVisible(false);

  const handleAddToCart = () => {
    const response = checkProductQuantity(item, cartItem);
    if (response) {
      increaseCartQuantity(item?.product_id);
    } else {
      showAlert();
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Productdetail', { id: item?.product_id })
        }
      >
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }}
        />
        <Text style={styles.itemName}>{item?.product_name}</Text>
        <Text style={styles.itemDescription}>325ml, Price</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>₹{item?.price}</Text>
          {item?.product_total_qty === 0 ? (
            <View style={styles.outOfStockContainer}>
              <Text style={styles.outOfStockText}>Out Of Stock</Text>
            </View>
          ) : cartItem.some(cartItem => cartItem?.product_id === item?.product_id) ? (
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => decreaseCartQuantity(item?.product_id)}
              >
                <Entypo name="minus" size={20} color="#bab7b6" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {cartItem.find(cartItem => cartItem?.product_id === item?.product_id)?.qty || 0}
              </Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleAddToCart}
              >
                <Entypo name="plus" size={20} color="#69AF5D" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addingItemInCart(item)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {isAlertVisible && (
        <CustomAlert
          visible={isAlertVisible}
          title="Out of Stock"
          productName={`${item?.product_name}`}
          productQty={`${item?.product_total_qty}`}
          onClose={closeAlert}
        />
      )}
    </View>
  );
});

const CategoryScreen = ({ route }) => {
  const { category_id } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const { data, error } = await supabase
        .from('newproducts')
        .select('*')
        .eq('category_id', category_id);
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      setError('Error fetching products.');
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category_id]);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.screenContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatListContentContainer}
            numColumns={2}
            data={products}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.product_id}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Products</Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: 'rgb(233,233,233)',
    borderWidth: 1,
    height: 270,
    width: width * 0.45, // Responsive width
  },
  itemImage: {
    width: '100%',
    height: 110,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    color: 'rgb(38,37,50)',
  },
  itemDescription: {
    paddingTop: 5,
    color: 'rgb(205,205,205)',
    fontFamily: 'Gilroy-Semibold',
    fontSize: 14,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    color: 'rgb(38,37,50)',
  },
  outOfStockContainer: {
    backgroundColor: '#E3E3E3',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  outOfStockText: {
    color: 'red',
    fontWeight: '500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:2
  },
  controlButton: {
    width: 30,
    height: 30,
    borderColor: '#bab7b6',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,

  },
  quantityText: {
    fontSize: 18,
    fontWeight:"500"
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgb(105,175,93)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'semibold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CategoryScreen;

