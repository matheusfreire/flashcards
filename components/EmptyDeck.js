import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red } from '../utils/colors'

export default function EmptyDeck() {
    return (
        <View style={styles.container}>
            {Platform.os === 'ios'
                ? <Ionicons name='ios-close-circle' size={100} color={red} />
                : <Ionicons name='md-close-circle' size={100} color={red} />
            }
            <Text sytle={styles.text}>None deck added</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})