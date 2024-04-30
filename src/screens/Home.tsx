import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useMyContext } from '../Context/Context'

type Props = {}

const Home = (props: Props) => {
    const {count}=useMyContext();
    return (
        <SafeAreaView>
            <Text>Home {count}</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})