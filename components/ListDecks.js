import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { List, Card } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { AppLoading } from 'expo'
import { connect } from 'react-redux'

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
            <View style={styles.container}>
                <List>
                    {Object.keys(decks).map((key) => (
                        <Card key={key} style={styles.card} title={JSON.parse(decks[key]).title}>
                            <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                                {`${JSON.parse(decks[key]).questions.length} cards`}
                            </Text>

                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.props.navigation.navigate('DeckDetail', { title: JSON.parse(decks[key]).title, quantity: JSON.parse(decks[key]).questions.length })} >
                                <Text style={styles.viewBtn}>View details</Text>
                            </TouchableOpacity>
                        </Card>
                        

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
    viewBtn: {
        color: white,
        fontSize: 18,
        textAlign: 'center',
    }
})

const mapStateToProps = (state) => ({ decks: state })

export default connect(
    mapStateToProps
)(ListDecks)