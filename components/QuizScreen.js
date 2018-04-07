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
		title: 'Quiz',
	})


	flipCard = () => {
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
		const deck = decks[navigation.state.params.deck]
		const quantityOfCards = deck.questions.length
		const { indexCard } = this.state
		return (
			<View style={styles.container}>
				<Text style={styles.resumeNumQuestions}>
					{indexCard + 1}/{quantityOfCards}
				</Text>
				{indexCard < quantityOfCards
					? this.showResume(quantityOfCards)
					: this.showResume(quantityOfCards)
				}
				
			</View >
		)
	}

	showResume = (quantityOfCards) => {
		return(
			<View style={styles.container}>
				<View style={styles.views}>
                    <Text style={styles.header}>
					Resume of Quiz
                    </Text>
                    <Text style={styles.card}>
					Correct: {Math.floor(this.state.numAnswersCorrect / quantityOfCards) * 100}
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
	viewBtn: {
		flex: 1,
		alignItems: 'flex-end',
		height: 50,
	},
	header: {
        marginBottom: 10, 
        textAlign: 'center',
        fontSize: 40,
    },
	subHeader: {
		margin: 20,
		textAlign: 'center',
		fontSize: 25,
	},
	resumeNumQuestions: {
		marginBottom: 10,
		textAlign: 'left',
		fontSize: 16,
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