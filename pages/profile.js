import React, {Component, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export const username = "admin";
export const current_transcript = "example log";

function Profile({navigation}) {
    const [email, setEmail] = useState(16);
    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>A2E</Text>
            </View>
            <View style={styles.main_container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#04a4f4"
                    onChangeText={(email) => setEmail(email)}
                    /> 
                    
                </View>
                <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>
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
        backgroundColor: '#F5F5F5',
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
        marginLeft: '1%',
        marginTop: '0.5%',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    }
});

export default Profile;