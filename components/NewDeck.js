import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform ,Keyboard} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { black, white } from '../utils/colors'

import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class NewDeck extends React.Component {
    state = {
        deck: ''
    }
    submit = () => {
        Keyboard.dismiss()
        const {deck} = this.state
        if(!deck || (deck !== null && deck.trim().length === 0)){
            alert("Please, provide a title for your new deck")
            return;
        }
        const obj = {title: deck, questions: []}
        saveDeckTitle({deck}).then(() => {
            this.props.dispatch(addDeck(obj, deck))
            this.setState({deck: ''})
            this.props.navigation.navigate('DeckDetail', {deck: deck})
        })
        // this.listDecks(deck)
    }

    listDecks = (deck) => {
        // this.props.navigation.goBack()
        this.props.navigation.navigate('DeckDetail', { deck: deck })
    }

    render() {
        const {deck} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.questions}>
                    What is the title of your new deck?
                </Text>
                <View>
                    <TextField label='Title' value={deck} onChangeText={ (deck) => this.setState({ deck }) }/>
                </View>
                <SubmitBtn onPress={this.submit} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    questions: {
        fontSize: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: black,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 7,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    snackbar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})
function mapStateToProps(state) {
    const {decks} =  state
    return {
        decks
    }
}

export default connect(
    mapStateToProps
)(NewDeck)