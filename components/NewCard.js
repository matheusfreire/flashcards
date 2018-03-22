import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform,TextInput,Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { black, white } from '../utils/colors'

import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class NewCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Add new card',
    })
    submit = () => {
        Keyboard.dismiss()
        const {navigation, dispatch} = this.props
        const deck = navigation.state.params.deck
        const card = {question: this.state.question, answer: this.state.answer}
        addCardToDeck({deck, card}).then(dispatch(addCard(deck, card)))
        this.goToDeck()
    }

    goToDeck = () => {
        this.props.navigation.back()
    }

    render() {
        const { navigation, decks } = this.props
        const {question, answer} = this.state
        return (
            <View style={styles.container}>
               <View style={styles.viewInput}>
                    <TextInput
                            value={question}
                            onChangeText={(question) => this.setState({question})}
                            placeholder="Question"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                        />
                </View>

                <View style={styles.viewInput}>
                    <TextInput
                            value={answer}
                            onChangeText={(answer) => this.setState({answer})}
                            placeholder="Answer"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                        />
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
    viewInput: {
        backgroundColor: white,
        borderColor: 'black',
        borderRadius: 55,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
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
)(NewCard)