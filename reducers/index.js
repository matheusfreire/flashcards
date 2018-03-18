import { GET_DECKS, ADD_NEW_DECK } from "../utils/ActionType";


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
        default:
            return state
    }
}

export default decks