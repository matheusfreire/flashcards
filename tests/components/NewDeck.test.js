import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from 'mock-async-storage'
import { AsyncStorage as storage } from 'react-native'

import NewDeck from '../../components/NewDeck';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})
const props = {}

const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}


describe('New deck', () => {

    it('renders without crashing', async () => {
        const rendered = renderer.create(<NewDeck {...props} store={store} />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

})