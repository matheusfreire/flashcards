import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, Button, Easing, Animated } from 'react-native'
import { Button as BtnNative } from 'react-native-elements'

class Quiz extends Component {

    state = {
        index: 0,
        showAnswer: false,
        numAnswersCorrect: 0,
        numAnswersIncorrect: 0,
        opacity: new Animated.Value(1),
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    })

    switchQuestionOrAnswer = () => {
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

    submitAnswer = (correct) => {
        if (correct) {
            this.setState({ corrects: (this.state.numAnswersCorrect + 1) })
        } else {
            this.setState({ incorrects: (this.state.numAnswersIncorrect + 1) })
        }
        this.setState({ index: (this.state.index + 1), showAnswer: false })

        const deck = this.props.decks[this.props.navigation.state.params.key]
        if (this.state.index >= deck.questions.length) {
            console.debug('Clear and SetNotifications')
            clearLocalNotification().then(setLocalNotification())
        }

    }

    restartQuiz = () => {
        this.setState({ index: 0, corrects: 0, incorrects: 0, showAnswer: false })
    }

    renderQuiz = (deck, index) => {
        const animatedText = index < deck.questions.length ? (this.state.showAnswer ? deck.questions[this.state.index].answer : deck.questions[this.state.index].question) : ''
        return (
            <View>
                <Text style={styles.subTitle}>
                    {this.state.index + 1}/{deck.questions.length}
                </Text>

                <Animated.Text style={[styles.text, { opacity: this.state.opacity }]}>
                    {animatedText}
                </Animated.Text>

                <Button onPress={this.switchQuestionOrAnswer} title={`${this.state.showAnswer ? 'Show Question' : 'Show Answer'} `} />

                <BtnNative onPress={() => this.submitAnswer(true)}
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
                />
            </View>
        )
    }

    renderEndQuiz = () => (
        <View>
            <Text style={styles.subTitle}>
                Finish Quiz
            </Text>
            <Text style={styles.subTitle}>
                Correct: {this.state.numAnswersCorrect}
            </Text>
            <Text style={styles.subTitle}>
                Incorrect: {this.state.numAnswersIncorrect}
            </Text>
            <Button onPress={this.restartQuiz} title='Restart Quiz' />
            <Button onPress={() => this.props.navigation.goBack()} title='Back to Deck' />
        </View>
    )

    render() {
        const { navigation, decks } = this.props
        const key = navigation.state.params.key
        const deck = decks[key]
        const index = this.state.index

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Quiz - {deck.title}
                </Text>

                {index < deck.questions.length ? (
                    this.renderQuiz(deck, index)
                ) : (
                        this.renderEndQuiz()
                    )}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Quiz)