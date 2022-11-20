import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

function Home({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>A2E</Text>
            </View>
            <View style={styles.main_container}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#04a4f4',
        textAlign: 'left',
        marginLeft: 15,
        marginTop: 5,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#04a4f4',
        marginBottom: 25,
        textAlign: 'center',
    },
    body: {
        fontSize: 20,
        fontWeight: '400',
        color: '#04a4f4',
        marginBottom: 80,
        textAlign: 'center',
    },
})

export default Home;