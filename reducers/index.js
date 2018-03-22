import { GET_DECKS, ADD_NEW_DECK, ADD_NEW_CARD } from "../utils/ActionType";


function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_NEW_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_NEW_CARD:
            let newState = {...state}
            newState[action.deck].questions.push(action.card)
            return {
                ...state, ...action.deck
            }
        default:
            return state
    }
}

export default decks