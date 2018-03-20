import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { List, ListItem, Card } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { AppLoading } from 'expo'
import { connect } from 'react-redux'

import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'
import DeckCard from './DeckCard'

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
            <View style={styles.container}>
                <List>
                    {Object.keys(decks).map((key) => (

                        <Card key={key} style={styles.card} title={JSON.parse(decks[key]).title}>
                            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                                {`${JSON.parse(decks[key]).questions.length} cards`}
                            </Text>

                            <TouchableOpacity
                                icon={
                                    <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                                    size={100}
                                  />
                                }
                                style={styles.buttonStyle}
                                onPress={() => { alert(`${JSON.parse(decks[key]).title} cards`) }} >
                                <Text style={styles.submitBtnText}>View now</Text>
                            </TouchableOpacity>
                        </Card>
                        // <ListItem key={key}
                        //     onPress={() => { alert(`${JSON.parse(decks[key]).title} cards`) }}
                        //     title={JSON.parse(decks[key]).title}
                        //     subtitle={`${JSON.parse(decks[key]).questions.length} cards`}
                        // />
                    ))}
                </List>
            </View >
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
    },
    buttonStyle:{
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: purple
    },
    submitBtnText: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
    }
})

const mapStateToProps = (state) => ({ decks: state })

export default connect(
    mapStateToProps
)(ListDecks)