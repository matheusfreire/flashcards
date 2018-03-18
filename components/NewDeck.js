import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { black, white } from '../utils/colors'

import { addDeck } from '../actions'
import { addNewDeck } from '../utils/api'

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
        const {deck} = this.state
        this.props.dispatch(addDeck(deck))
        addNewDeck({deck})
        this.listDecks()
    }

    listDecks = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'NewDeck'
        }))
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
    const {deck} =  state
    return {
        deck
    }
}

export default connect(
    mapStateToProps
)(NewDeck)