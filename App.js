import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import reducer from './reducers'
import ListDecks from './components/ListDecks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import { yellow, black, white } from './utils/colors'
import NewCard from './components/NewCard';

function FlashStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = TabNavigator({
	ListDeck: {
		screen: ListDecks,
		navigationOptions: {
			tabBarLabel: 'DECKS',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={black} />
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'NEW DECKS',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={black} />
		}
	}
}, {
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: black,
			style: {
				height: 56,
				backgroundColor: white,
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1

			}
		}
	},
	{
		initialRouteName: "Home",
		swipeEnabled: false,
		animationEnabled: false,
		lazy: true,
		transitionConfig: () => ({
			transitionSpec: {
				duration: 0,
			},
		}),
	},
)

const Navigator = StackNavigator(
	{
		Home: {
			screen: Tabs
		},
		DeckDetail: {
			screen: DeckDetail,
			navigationOptions: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: black
				}
			}
		},
		NewCard: {
			screen: NewCard,
			navigationOptions: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: black
				}
			}
		}
	}
)







export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<FlashStatusBar backgroundColor={black} barStyle={barStyle = "light-content"} />
					<Navigator />
				</View>
			</Provider>
		)
	}
} 