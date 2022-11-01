import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

function Button({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.button_text}>{children}</Text>
        </TouchableOpacity>
    );
}

class Launch extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background_container}>
                    <Text style={styles.logo}>A2E</Text>
                </View>
                <View style={styles.main_container}>
                    <Text style={styles.title}>Welcome to{"\n"}ASL-to-English</Text>
                    <Text style={styles.body}>We translate your ASL to English all in one application.</Text>
                    <Button>Get Started</Button>
                </View>
            </View>
        );
    }
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
    button: {
        alignItems: 'center',
        backgroundColor: '#04a4f4',
        padding: 10,
        borderRadius: 50,
        width: 250,
    },
    button_text: {
        marginBottom: 2,
        marginTop: 2,
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
    },
})

export default Launch;