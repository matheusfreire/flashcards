export const FLASHCARD_STORAGE_KEY = 'msf:flashcard'


export function fetchDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export function addNewDeck({ entry, key }) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [key]: entry
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