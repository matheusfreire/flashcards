import { GET_DECKS, ADD_NEW_DECK, ADD_NEW_CARD } from "../utils/ActionType";


export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function addDeck(newDeck) {
  return {
    type: ADD_NEW_DECK,
    newDeck,
  }
}

export function addCard(deck,card){
  return {
    type: ADD_NEW_CARD,
      deck, card
  }
}