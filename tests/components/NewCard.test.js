import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from 'mock-async-storage'
import { AsyncStorage as storage } from 'react-native'

import NewCard from '../../components/NewCard';

const decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    }
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})
const props = {}

const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}


describe('Deck List', () => {

    it('renders without crashing', async () => {
        mock()

        await storage.setItem('flashcards', JSON.stringify(decks))

        store.dispatch = jest.fn();

        const rendered = renderer.create(<NewCard {...props} store={store} />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

})