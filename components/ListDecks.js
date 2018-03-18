import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'

import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'
import DeckCard from './DeckCard'


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
                        <ListItem key={key}
                            onPress={() => {alert(`${JSON.parse(decks[key]).title} cards`)}}
                            title={JSON.parse(decks[key]).title}
                            subtitle={`${JSON.parse(decks[key]).questions.length} cards`}
                        />
                    ))}
                </List>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = (state) => ({ decks: state })

export default connect(
    mapStateToProps
)(ListDecks)