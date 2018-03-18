import React, {Component} from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class ListDecks extends Component{
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                title="Go to Details"
                onPress={() => this.props.navigation.navigate('NewDeck')}
                />
            </View>
        )
    }
}

export default ListDecks