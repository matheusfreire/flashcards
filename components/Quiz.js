import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, Button, Easing, Animated,TouchableOpacity } from 'react-native'
import { Button as BtnNative } from 'react-native-elements'
import { white, red, green, black, gray } from '../utils/colors';

class Quiz extends Component {

    state = {
        quantity: 0,
        showAnswer: false,
        numAnswersCorrect: 0,
        numAnswersIncorrect: 0,
        opacity: new Animated.Value(1),
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    })

    switchQuestionOrAnswer = () =>{
        this.state.opacity.setValue(0)
        this.setState({ showAnswer: !this.state.showAnswer })
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }

    submitAnswer(correct){
        if (correct) {
            this.setState({ numAnswersCorrect: (this.state.numAnswersCorrect + 1) })
        } else {
            this.setState({ numAnswersIncorrect: (this.state.numAnswersIncorrect + 1) })
        }
        this.setState({ index: (this.state.quantity + 1), showAnswer: false })

        const deck = this.props.decks[this.props.navigation.state.params.key]
        if (this.state.quantity >= deck.questions.length) {
            clearLocalNotification().then(setLocalNotification())
        }

    }

    reset (){
        this.setState({ 
            index: 0,
            showAnswer: false,
            numAnswersCorrect: 0,
            numAnswersIncorrect: 0
         })
    }

    renderQuiz = (deck, index) => {
        const animatedText = index < deck.questions.length ? (this.state.showAnswer ? deck.questions[this.state.quantity].answer : deck.questions[this.state.quantity].question) : ''
        return (
            <View style={styles.container}>
                <Text style={styles.subTitle}>
                    {this.state.quantity + 1}/{deck.questions.length}
                </Text>

                <Animated.Text style={[styles.text, { opacity: this.state.opacity }]}>
                    {animatedText}
                </Animated.Text>

                <Button onPress={this.switchQuestionOrAnswer} title={`${this.state.showAnswer ? 'Show Question' : 'Show Answer'} `} />

                {/* <BtnNative onPress={() => this.submitAnswer(true)}
                    buttonStyle={{ backgroundColor: 'green', width: null, height: 40, marginTop: 30 }}
                    textStyle={{ color: 'white', marginHorizontal: 20 }}
                    title='Correct'
                    disabled={!this.state.showAnswer}
                />

                <BtnNative onPress={() => this.submitAnswer(false)}
                    buttonStyle={{ backgroundColor: 'red', width: null, height: 40, marginTop: 5 }}
                    textStyle={{ color: 'white', marginHorizontal: 20 }}
                    title='Incorrect'
                    disabled={!this.state.showAnswer}
                /> */}

                <View style={[styles.views, {alignItems: 'center'}]}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: this.state.showAnswer ? green: gray}]}
                        onPress={() => this.submitAnswer(true)}
                        disabled={!this.state.showAnswer} >
                        <Text style={[styles.textBtn, {color: white}]}>Correct</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: this.state.showAnswer ? red: gray}]}
                        onPress={() => this.submitAnswer(false)}
                        disabled={!this.state.showAnswer} >
                        <Text style={[styles.textBtn, {color: white}]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    finishQuiz = () => (
        <View style={styles.container}>
            <Text style={styles.subTitle}>
                Finish Quiz
            </Text>
            <Text style={styles.subTitle}>
                Correct: {this.state.numAnswersCorrect}
            </Text>
            <Text style={styles.subTitle}>
                Incorrect: {this.state.numAnswersIncorrect}
            </Text>

            <View style={[styles.views, {alignItems: 'center'}]}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: black}]}
                        onPress={() => {this.reset()}}>
                        <Text style={[styles.textBtn, {color: white}]}>Reset</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: red}]}
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={[styles.textBtn, {color: white}]}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            {/* <Button onPress={this.restartQuiz} title='Restart Quiz' /> */}
            {/* <Button onPress={() => this.props.navigation.goBack()} title='Back to Deck' /> */}
        </View>
    )

    render() {
        const { navigation, decks } = this.props
        const key = navigation.state.params.key
        const deck = decks[key]
        const index = this.state.quantity

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Quiz - {deck.title}
                </Text>

                {index < deck.questions.length 
                    ? this.renderQuiz(deck, index)
                    : this.finishQuiz()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between',
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
    subTitle: {
        padding: 5,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
    text: {
        marginTop: 20,
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
    views: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
        marginTop: 50
    },
    btn:{
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 150,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        
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

export default connect(mapStateToProps)(Quiz)