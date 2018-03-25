import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { List, Card } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { AppLoading } from 'expo'
import { connect } from 'react-redux'

import EmptyDeck from '../components/EmptyDeck'

import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'

import { blue, white, purple } from '../utils/colors'

class ListDecks extends Component {

    state = {
        loading: true,
    }

    componentDidMount() {
        fetchDecks()
            .then((decks) => {
                this.props.dispatch(getDecks(decks))
            })
            .then((results) => {
                this.setState(() => { decks: results })
            })
            .then(() => {
                this.setState({ loading: false })
            })
            .catch((error) => {
                console.log("error", error.message)
                this.setState(() => { loading: false })
            })
    }


    renderItem(item) {
        return <DeckCard title={item.title} quantityCards={item.questions.length} />
    }

    render() {

        const { loading } = this.state
        const { decks } = this.props

        if (loading) {
            return (
                <View style={styles.container}>
                    <AppLoading />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {decks 
                    ?<List>
                        {Object.keys(decks).map((key) => (
                            <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate('DeckDetail', { deck: key })} >
                                <Card  style={styles.card} title={decks[key].title}>
                                    <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                                        {`${decks[key].questions.length} cards`}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </List>
                    :<EmptyDeck />
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    card: {
        borderRadius: 5
    }
})

const mapStateToProps = (state) => ({ decks: state })

export default connect(
    mapStateToProps
)(ListDecks)