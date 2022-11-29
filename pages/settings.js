import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

function Home({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.profile}>
            <Text style={styles.profile_text}>{children}</Text>
        </TouchableOpacity>
    )
}
function Settings({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.button_text}>{children}</Text>
        </TouchableOpacity>
    )
}



function detection(onPress) {
    //var sock = new WebSocket("ws://localhost:5001");
    var sock = new WebSocket("ws://10.0.2.15:3000");  //replace this address with the one the node.js server prints out. keep port 3000
    var display=document.getElementById("display");
    
    sock.onopen=function(onPress){
        //alert("Socket connected succesfully!!!")
        setTimeout(function(){sock.send('connection succeeded');},1000);
        display.innerHTML+="connection succeeded <br />";
    };
    sock.onmessage=function(onPress){
        console.log(onPress);//show received from server data in console of browser
        display.innerHTML+=onPress.data+"<br />"; //add incoming message from server to the log screen previous string + new string(message)
    }
}

function Settings({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>Settings</Text>
            </View>
            <View style={styles.main_container}>
                <Text style={styles.title}></Text>
                <Text style={styles.body}></Text>
                <Home onPress={()=> navigation.navigate('Launch')}>Return Home</Home>
                <Detect onPress={() => detection(onPress) }></Detect>
            </View>
        </View>
    )
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

export default Settings;