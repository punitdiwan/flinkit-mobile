import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useMyContext } from '../Context/Context'
import Header from '../Components/Header'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App';
import Category from '../Components/Category'

type HomeProps =NativeStackScreenProps<RootStackParamList,'Home'>

const Home = ({navigation,route}:HomeProps) => {
    const { count } = useMyContext();
    return (
        <SafeAreaView>
            <ScrollView>
                <Header navigation={navigation} route={route} />
                <Category navigation={navigation} route={route}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})