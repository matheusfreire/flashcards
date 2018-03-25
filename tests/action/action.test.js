import { getDecks, addDeck, addCard, excludeDeck } from '../../actions/index'
import { GET_DECKS, ADD_NEW_DECK, REMOVE_DECK, ADD_NEW_CARD } from '../../utils/ActionType'

const card1 = {
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
}

const card2 = {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
}

const deck = {
    deck: 'React',
    questions: [
        card1,
        card2
    ]
}

const title = "React"

const decks = {
    [title]: deck
}

describe('Actions', () => {

    it('FETCH_DECKS', () => {
        const expectedActions = { type: "GET_DECKS", decks }
        expect(getDecks(decks)).toEqual(expectedActions)
    })

    it('ADD_NEW_DECK', () => {
        const expectedActions = { type: ADD_NEW_DECK, newDeck: deck, title }
        expect(addDeck(deck, title)).toEqual(expectedActions)
    })

    it('ADD_NEW_CARD', () => {
        const expectedActions = { type: ADD_NEW_CARD, deck: title, card: card1 }
        expect(addCard(title, card1)).toEqual(expectedActions)
    })

    it('EXCLUDE_DECK', () => {
        const expectedActions = { type: REMOVE_DECK, deck: title }
        expect(excludeDeck(title)).toEqual(expectedActions)
    })

})