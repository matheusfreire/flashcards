import reducer from '../../reducers'
import { GET_DECKS, ADD_NEW_DECK, REMOVE_DECK, ADD_NEW_CARD } from '../../utils/ActionType'


const card1 = {
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
}

const card2 = {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
}

const deck1 = {
    title: 'React',
    questions: [
        card1
    ]
}

const deck2 = {
    title: 'Redux',
    questions: [
        card2
    ]
}

const title = "React"

const decks = {
    [title]: deck1
}

describe('Reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })


    it('GET_DECKS', () => {
        expect(
            reducer({}, {
                type: GET_DECKS,
                decks
            })
        ).toEqual(decks)
    })

    it('ADD_NEW_DECK', () => {
        const state = decks
        const title2 = deck2.title
        const expectedState = { ...state, [title2]: deck2 }
        expect(
            reducer(state, {
                type: ADD_NEW_DECK,
                title: title2,
                newDeck: deck2
            })
        ).toEqual(expectedState)
    })

    it('ADD_NEW_CARD', () => {
        const state = decks
        const expectedState = { ...state }
        expectedState[title].questions.push(card2)
        expect(
            reducer(state, {
                type: ADD_NEW_CARD,
                deck: title,
                card: card2
            })
        ).toEqual(expectedState)
    })

    it('REMOVE_DECK', () => {
        const state = decks
        const expectedState = {}
        expect(
            reducer(state, {
                type: REMOVE_DECK,
                deck: title
            })
        ).toEqual(expectedState)
    })

})