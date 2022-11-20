import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

function Profile({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.profile}>
                <Text style={styles.profile_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function Settings({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.settings}>
                <Text style={styles.settings_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function CameraButton({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.button_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function StartCamera() {

}

function Home({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Text style={styles.logo}>A2E</Text>
                <Profile onPress={() => navigation.navigate('Launch') }>Profile</Profile>
                <Settings onPress={() => navigation.navigate('Launch') }>Settings</Settings>
            </View>
            <View style={styles.main_container}>
                <View style={styles.left_screen}>
                    <Text style={styles.body}>Left</Text>
                    <CameraButton onPress={() => StartCamera()}>Start Camera</CameraButton>
                </View>
                <View style={styles.verticle_line}></View>
                <View style={styles.right_screen}>
                    <Text style={styles.body}>Right</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    top_container: {
        width: '100%',
        height: '7.5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
    },
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#04a4f4',
        textAlign: 'left',
        width: '50%',
        marginLeft: '1%',
    },
    profile_text: {
        fontSize: 23,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#04a4f4',
        textAlign: 'center',
    },
    settings_text: {
        fontSize: 23,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#04a4f4',
        textAlign: 'center',
    },
    profile: {
        marginLeft: '30%',
    },
    settings: {
        marginLeft: '3%',
    },
    main_container: {
        width: '100%',
        height: '92.5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
    },
    left_screen: {
        width: '49.8%',
        height: '100%',
    },
    right_screen: {
        width: '49.8%',
        height: '100%',
    },
    verticle_line:{
        height: '90%',
        width: 2,
        backgroundColor: '#909090',
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#04a4f4',
        padding: 10,
        borderRadius: 50,
        width: 250,
    },
    button_text:{
        marginBottom: 2,
        marginTop: 2,
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    body: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',
        marginBottom: 80,
        textAlign: 'center',
    },
})

export default Home;