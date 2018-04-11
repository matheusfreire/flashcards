import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { white, red, green, black, gray } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import { Card } from 'react-native-elements'
import FlipComponent from 'react-native-flip-component'

class Quiz extends Component {
	state = {
		indexCard: 0,
		numAnswersCorrect: 0,
		numAnswersIncorrect: 0,
		isFlipped: false
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Quiz',
	})

	submitAnswer = (correct) => {
		if (correct) {
			this.setState({ numAnswersCorrect: this.state.numAnswersCorrect + 1 })
		} else {
			this.setState({ numAnswersIncorrect: this.state.numAnswersIncorrect + 1 })
		}
		let newIndex = this.state.indexCard + 1
		this.setState({ indexCard: newIndex, isFlipped: false })
		const deck = this.props.decks[this.props.navigation.state.params.deck]
		if (newIndex >= deck.questions.length) {
			clearLocalNotification().then(setLocalNotification())
		}
	}

	reset = () => {
		this.setState({
			indexCard: 0,
			numAnswersCorrect: 0,
			numAnswersIncorrect: 0,
			isFlipped: false
		})
	}


	render() {
		const { navigation, decks } = this.props
		const deck = decks[navigation.state.params.deck]
		const quantityOfCards = deck.questions.length
		const { indexCard } = this.state
		return (
			<View style={styles.container}>
				{indexCard < quantityOfCards
					? this.showCard(deck, indexCard, quantityOfCards)
					: this.showResume(quantityOfCards)
				}
			</View >
		)
	}

	showCard = (deck, index, quantityOfCards) => {
		const question = deck.questions[index]
		return (
			<View>
				<Text style={styles.resumeNumQuestions}>
					{this.state.indexCard + 1}/{quantityOfCards}
				</Text>

				<FlipComponent
					containerStyles={{alignItems: 'center'}}
					isFlipped={this.state.isFlipped}
					frontView={
						this.showQuestion(question.question)
					}
					backView={
						this.showAnswer(question.answer)
					}
				/>
				<Button onPress={() => {this.setState({ isFlipped: !this.state.isFlipped })}}
					title={!this.state.isFlipped ? "Show answer":"Show question"}/>
			</View>
		)
	}

	showQuestion = (question) => {
		return (
			<View>
				<Card style={styles.viewCard} title={question}>
					<Text style={{ marginBottom: 10, textAlign: 'center' }}>
						Click below to view the answer
					</Text>
				</Card>
				{this.showButtons(false)}
			</View>
		)
	}

	showButtons = (enable) => {
		return (
			<View style={{ alignItems: 'center' }}>
				<TouchableOpacity
					style={[styles.btn, { backgroundColor: enable ? green : gray }]}
					onPress={() => this.submitAnswer(true)}
					disabled={!enable} >
					<Text style={[styles.textBtn, { color: white }]}>Correct</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.btn, { backgroundColor: enable ? red : gray }]}
					onPress={() => this.submitAnswer(false)}
					disabled={!enable} >
					<Text style={[styles.textBtn, { color: white }]}>Incorrect</Text>
				</TouchableOpacity>
			</View>
		)
	}
	showAnswer = (answer) => {
		return (
			<View>
				<Card style={styles.viewCard} title={answer}>
					<Text style={{ marginBottom: 10, textAlign: 'center' }}>
						Click in buttons below to answer that
					</Text>
				</Card>
				{this.showButtons(true)}
			</View>
		)
	}

	showResume = (quantityOfCards) => {
		return (
			<View style={styles.container}>
				<View style={styles.views}>
					<Text style={styles.header}>
						Resume of Quiz
                    </Text>
					<Text style={styles.subHeader}>
						Correct: {((this.state.numAnswersCorrect / quantityOfCards) * 100).toFixed(2)}%
					</Text>
				</View>
				<View style={[styles.views, { alignItems: 'center' }]}>
					<TouchableOpacity style={[styles.btn, { backgroundColor: black }]}
						onPress={() => { this.reset() }}>
						<Text style={[styles.textBtn, { color: white }]}>Reset</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.btn, { backgroundColor: red }]}
						onPress={() => this.props.navigation.goBack()}>
						<Text style={[styles.textBtn, { color: white }]}>Back to Deck</Text>
					</TouchableOpacity>
				</View>
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
	views: {
		flex: 1,
		justifyContent: 'center',
		height: 50,
	},
	viewCard: {
		borderRadius: 5
	},
	header: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 40,
	},
	subHeader: {
		margin: 20,
		textAlign: 'center',
		fontSize: 19,
		color: gray
	},
	resumeNumQuestions: {
		marginBottom: 10,
		textAlign: 'left',
		fontSize: 16,
		color: gray
	},
	btn: {
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
