import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 's2'

export function fetchDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(result => {
        return JSON.parse(result)
    })
   
}

export function saveDeckTitle({ deck }) {
    const newObject = {'title': deck , questions: []}
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck]: newObject
    }))
}

// export function addCardToDeck({title, card}){
//     this.fetchDecks().reduce((deck, subject) => {
//         subject.questions.push(card)
//         return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
//             [deck]: subject
//         }))
//     },{})
// }

export function addCardToDeck(title, card) {
    return fetchDecks().then(results => {
        deck = results[title]
        deck.questions.push(card)
        return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
            [title]: deck
        }))
    })

}

export function removeDeck(key) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
        })
}