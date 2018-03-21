import React from 'react';
import {Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Card } from 'react-native-elements'
import { gray, purple, white } from '../utils/colors';

export default function DeckCard({ title, questions, showViewButton }) {

    return (
        <Card style={styles.card} title={title}>
            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                {`${questions.length} cards`}
            </Text>

            {showViewButton && <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => { alert(`${title} cards`) }} >
                <Text style={styles.viewBtn}>View now</Text>
            </TouchableOpacity>}
            
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5
    },
    buttonStyle:{
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: purple
    },
    viewBtn: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
    }
})