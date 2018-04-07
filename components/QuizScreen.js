import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { white, red, green, black, gray } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class QuizScreen extends Component {
	state = {
		indexCard: 0,
		isAnswerVisible: false,
		numAnswersCorrect: 0,
		numAnswersIncorrect: 0,
	}

	static navigationOptions = ({ navigation }) => ({
		header: 'Quiz',
	})


	setVisibilityOfAnswer = () => {
		this.setState({ isAnswerVisible: !this.state.isAnswerVisible })
	}

	submitAnswer = (correct) => {
		if (correct) {
			this.setState({ numAnswersCorrect: ++this.state.numAnswersCorrect })
		} else {
			this.setState({ numAnswersIncorrect: ++this.state.numAnswersIncorrect + 1 })
		}
		this.setState({ indexCard: ++this.state.indexCard, isAnswerVisible: false })

		const deck = this.props.decks[this.props.navigation.state.params.deck]
		if (this.state.indexCard >= deck.questions.length) {
			clearLocalNotification().then(setLocalNotification())
		}
	}

	reset = () => {
		this.setState({
			indexCard: 0,
			isAnswerVisible: false,
			numAnswersCorrect: 0,
			numAnswersIncorrect: 0
		})
	}

	render() {
		const { navigation, decks } = this.props
		const deck = decks[navigation.state.params.key]
		const quantityOfCards = decks.questions.length
		return (
			<View style={styles.container}>
				<Text styles={resumeNumQuestions}>
					{this.state.indexCard}/{quantityOfCards}
				</Text>
				<Text style={styles.header}>
					Quiz - {deck.header}
				</Text>

				{this.state.indexCard < quantityOfCards
					? this.renderQuiz(deck, index)
					: this.showResume(quantityOfCards)
				}
			</View>
		)
	}

	showResume = (quantityCards) => {
		<View>
			<Text style={styles.subheader}>
				Resume of Quiz
			</Text>
			<Text style={[styles.subheader,{ backgroundColor: black }]}>
				Correct: {this.state.numAnswersCorrect/quantityCards}
			</Text>
			<View style={[styles.views, { alignItems: 'center' }]}>
				<TouchableOpacity
					style={[styles.btn, { backgroundColor: black }]}
					onPress={() => { this.reset() }}>
					<Text style={[styles.textBtn, { color: white }]}>Reset</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.btn, { backgroundColor: red }]}
					onPress={() => this.props.navigation.goBack()}>
					<Text style={[styles.textBtn, { color: white }]}>Back to Deck</Text>
				</TouchableOpacity>
			</View>
		</View>
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
	viewBtn: {
		flex: 1,
		alignItems: 'flex-end',
		height: 50,
	},
	header: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 30,
		color: black
	},
	subHeader: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 25,
	},
	resumeNumQuestions: {
		marginBottom: 10,
		textAlign: 'left',
		fontSize: 12,
		color: gray
	},
	card: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 20,
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

export default connect(mapStateToProps)(QuizScreen)