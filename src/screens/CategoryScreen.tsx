import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { CategoryData } from "../components/Category";

import SearchCard from "../components/SearchCard";
import { useMyContext } from "../context/Context";

import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { loadCartData, supabase } from "./supabaseClient";
import { addToCartFun } from "../../lib/cartFun";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";


const Tab = createBottomTabNavigator<RootStackParamList>();
// const apikey = "";
const apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw"


const dummyProduct = [
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  }
]


const dummyProduct2 = [
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  },
  {
    "category_id": 5, "created_at": "2024-06-05T12:36:31.930773+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "packing_weight": null, "price": 50, "product_brand": "Britannia", "product_category": "Dairy & Egg", "product_details": "Buy Britannia Healthy Slice Bread 450 g Online at Best Prices in India", "product_discount": "20%", "product_id": 3, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/breads.png", "product_imgeid": "97d3f35a-93a7-48ca-91e5-c3d03f2b8bc1", "product_name": "Britannia Healthy Slice Bread", "product_packing_type": "kilogram", "product_total_qty": 400, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T12:36:31.930773+00:00", "uuid": "6dcc532a-08c4-4939-9624-887b82a384df", "variant_group_id": null, "visibility": true, "weight": null
  }
]



const CategoryScreen = (category_id: any, { navigate }: any) => {
  console.log("rendering");
  interface Products {
    product: {
      product_id: string;
      product_imagename: string;
      product_name: string;
      price: number;
    };
  }
  const ref = useRef<{ product_id: string }>(null);

  const { cartItem,addingItemInCart,increaseCartQuantity,decreaseCartQuantity } = useMyContext();
  const [products, setProducts] = useState<any>([]);
  const [increaseCardQuantity, setincreaseCardQuantity] = useState<string[]>(
    []
  );
  const [product,setProduct] = useState(dummyProduct);
  console.log("product",product?.length);
  const [isLoading,setIsLoading] = useState(false);

  // const cartItemList = useSelector(store => store?.cart?.cartItemList);
  // console.log("screen",cartItemList);
  

  // console.log("category_id:", category_id.route.params.category_id);
  // const id = category_id.route.params.category_id;
  // console.log("newId", newId);
  // console.log("id:");
  // const resp = await fetch(
  //   `https://backend.delivery.maitretech.com/rest/v1/newproducts`,
  //   {
  //     headers: {
  //       Apikey: apikey,
  //     },
  //   }
  // );
  // const quantity = getItemQuintity("0");

  // old addTOCart






  const fetchData = async () => {
      const newId = category_id.route.params.category_id;
    console.log("category_id:", category_id.route.params.category_id);
    const resp: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("category_id", newId).limit(1);
    console.log("resp", resp);

    setProducts(resp.data);
  };

  // const setProductToScreen = () => {
  //   console.log("set Product To screen");
    
  //     setProduct([...dummyProduct]);
  // }

  // useEffect(() => {
  //   setProductToScreen();
  // },[])


  useEffect(() => {
    fetchData();
  }, [category_id]);


  useEffect(() => {
    console.log("Updated product:", product.length);
    // setProduct([]);
    // setProduct(product)
  }, [product]); // This will log whenever product state changes

  const loadMoreProduct = () => {
    // setIsLoading(!isLoading)
    console.log("more product load");
    console.log("dummyProduct2:", dummyProduct2); // Check dummyProduct2 contents
    const updateProduct = [...product, ...dummyProduct2];
    // updateProduct?.map(item => setProduct([...product,item]))
    setProduct(updateProduct);
    console.log("product length",product.length);
    return
    // setIsLoading(!isLoading)
  };


  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}:any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const navigation = useNavigation<any>();
   return (
        <>
        <View style={{paddingLeft:20,backgroundColor:"white"}}>
         {products.length == 0 ? <View style={{width:"100%",justifyContent:"center",alignItems:"center",minHeight:"100%"}}><Text style={{fontSize:20,fontWeight:"semibold",textDecorationLine:"underline"}}>"No Products"</Text></View>: <ScrollView   onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent) && !isLoading) {
                setIsLoading(true)
                loadMoreProduct();
                setIsLoading(false)
              }
            }}
            scrollEventThrottle={200} ><View
            style={{
              display: "flex",
              flexDirection:"row",    
              minHeight: "100%",
              width:"100%",
              backgroundColor:"white",
              flexWrap:"wrap",
              alignItems:"center",
              justifyContent:"flex-start",
              gap:10,
              paddingTop:10
            }}
          >
            {isLoading == false ? product.map((item,index)=> 
                <View key={index} style={{backgroundColor:"white",width:180,marginVertical:3,paddingVertical:30,paddingHorizontal:10,borderRadius:20,height:270,borderColor:"rgb(233,233,233)",borderWidth:1}}>
                  <TouchableOpacity    onPress={() =>
            navigation.navigate("Productdetail", {
              id: item?.product_id,
            })
          }>
                    <View>
                    <Image  style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: item?. product_imagename }}
                />
                 <Text style={{fontSize:15,fontWeight:"bold",color:"rgb(38,37,50)"}}>{item?.product_name}</Text>
                 <Text style={{paddingTop:5,color:"rgb(205,205,205)",fontWeight:"bold"}}>325ml,Price</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:15,alignItems:"center"}}>

                        <View>
                        <Text style={{fontSize:15,fontWeight:"bold",color:"rgb(38,37,50)"}}>₹{item?.price}</Text>
                        </View>

                        {cartItem.filter(itemm => itemm?.product_id == item?.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5
                    }}
                    onPress={() => decreaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{color:"#bab7b6"}}>
                      <Entypo name="minus" size={20}/>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5
                    }}>
                      <Text style={{fontSize:20}}>
                      {cartItem.filter(itemm => itemm?.product_id == item?.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{    width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5}} onPress={() => increaseCartQuantity(item?.product_id)}>
                        <Entypo name='plus' style={{fontSize:20,color:"#69AF5D"}} />
                    </TouchableOpacity>
                </View> :   <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(105,175,93)",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                      // backgroundColor:"red",
                      // backgroundColor:""
                      
                    }}
                    onPress={() => addingItemInCart(item)}
                  >
                    +
                  </Text>
                </TouchableOpacity>
                
                }

                    </View>
                </TouchableOpacity>
                </View>
            ): <ActivityIndicator size={24} color={"black"}/>}

          </View>
          <View style={{width:"100%",justifyContent:"center",alignItems:"center",height:60,bottom:0,position:"absolute",backgroundColor:"white"}}>
          <ActivityIndicator size={40}/>
          </View>
          </ScrollView>
}
</View>
        </>
      );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  body: {
    width: "45%",
    height: "auto",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0ebeb",
    shadowColor: "white",
  },
});
