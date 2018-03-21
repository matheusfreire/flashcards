import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'teste'

export function fetchDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(result => {
        return JSON.parse(result)
    })
   
}

export function saveDeckTitle({ deck }) {
    const newObject = JSON.stringify({'title': deck , questions: []})
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck]: newObject
    }))
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