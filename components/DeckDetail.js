import React, {Component} from 'react'

import {View,Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {Card } from 'react-native-elements'

import { connect } from 'react-redux'

import { gray, purple, white, black } from '../utils/colors'

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        return {
            title: `${deck}`
        }
    }
    render(){
        const {navigation, decks} = this.props
        const key = navigation.state.params.deck
        const deck = JSON.parse(decks[key])
        const {title, questions } = deck

        return (
            <View style={styles.container}>

                <View style={styles.views}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.card}>
                        {`${questions.length} cards`}
                    </Text>
                </View>
    
                <View style={[styles.views, {alignItems: 'center'}]}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: white,borderColor: 'black', borderWidth: 2}]}
                        onPress={() => this.props.navigation.navigate('NewCard', { deck: key })} >
                        <Text style={[styles.textBtn, {color: black}]}>Add Card</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: black }]}
                        onPress={() => { alert(`${title} cards`) }} >
                        <Text style={[styles.textBtn, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: white,
        justifyContent: 'space-between',
    },
    views: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
    },
    viewBtn:{
        flex: 1,
        alignItems: 'flex-end',
        height: 50,
    },
    title: {
        marginBottom: 10, 
        textAlign: 'center',
        fontSize: 40,
    },
    card: {
        marginBottom: 10, 
        textAlign: 'center',
        fontSize: 20,
        color: gray
    },
    btn:{
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 150,
        marginLeft: 40,
        marginRight: 40,
        
    },
    textBtn: {
        color: black,
        fontSize: 18,
        textAlign: 'center',
    }
})
function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckDetail)