import React, {Component, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, 
    TextInput
} from 'react-native';

export const username = "admin";
export const current_transcript = "example log";


// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}


function Profile({navigation}) {
    const [email, setEmail] = useState('username');
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
            
                <View style={styles.break}/>
        <Button 
                            onPress={() => navigation.navigate('Home')}
                            toStyle={styles.loginBtn}
                            textStyle={styles.loginText}
                        >
                       LOGIN
                </Button>

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
   /* TextInput: {
        height: 50,
        //flex: 3,
        padding: 10,
        fontSize: 25,
        marginBottom: 20,
        paddingLeft: 30,
        backgroundColor:'#fff',
    },*/
    TextInput: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#04a4f4',
        borderWidth: 1,
        borderRadius: 15, 
        fontSize: 20,
    },
    inputView: {
        backgroundColor:'#04a4f4',
       // flex: 2,
        paddingRight: 30,
        paddingLeft: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15, 
        borderColor: '#04a4f4',
        //marginLeft: 20,
    },
    highlight: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    loginText: {
        fontSize: 22,
        color: '#fff', 
        textAlign: 'center',
    },
    loginBtn: {
        backgroundColor:'#04a4f4',
       // flex: 2,
        paddingRight: 30,
        paddingLeft: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15, 
        borderColor: '#04a4f4',
        //marginLeft: 20,
    },
    break: {
        height: '3%',
        
    },
});

export default Profile;