import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AppLoading } from 'expo'

import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'

import { connect } from 'react-redux'

class ListDecks extends Component {

    state = {
        loading: true,
    }

    componentDidMount() {
        fetchDecks()
            .then( (decks) => {
                this.props.dispatch(getDecks(decks))
            })
            .then((results) => {
                this.setState(() => { decks: results })
            })
            .then(() => {
                this.setState({loading: false})
            })
            .catch((error) => {
                console.log("error",error.message)
                this.setState(() => { loading: false })
            })
    }

    render() {

        const { loading } = this.state
        const {decks} = this.props

        if (loading) {
            return (
                <View style={styles.container}>
                    <AppLoading />
                </View>
            )
        }
        return (
            <View style={styles.container}>
               <Text>{JSON.stringify(decks)}</Text> 
            </View>
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

const mapStateToProps = (state) => ({decks: state})

export default connect(
    mapStateToProps
)(ListDecks)