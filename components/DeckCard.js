import React from 'react';
import { Button, View, Text } from 'react-native';
import { gray } from '../utils/colors';

export default function DeckCard({title, quantityCards}){

    return(
        <View>
            <Text style={{fontSize: 20}}>
                {title}
            </Text>
            <Text style={{fontSize: 16, color: gray}}>
                {quantityCards} cards
            </Text>
        </View>
    )
}