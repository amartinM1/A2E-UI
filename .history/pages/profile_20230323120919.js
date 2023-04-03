import React, {Component,useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, 
    TextInput,
    ScrollView,
    FlatList,
} from 'react-native';

export const username = "admin";
export const current_transcript = "example log";
export const test_user = "a2e";
export const myState = () => {
    const [test_user, setUser] = useState('user');
    return {test_user, setUser};
}

// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}



let itemsRef = database().ref('/items');

function Profile({navigation}) {
    //const [test_user, setEmail] = useState('user');
    
   /* onClickLogin = () => {
     setEmail(test_user);
     //let test_user = this.test_user;
     navigation.navigate('Transcripts');
    }
    handleUserChange = function(event){
        setEmail(event);
    }*/
   //try uncommenting this and see if we can set the test_user variable AND nav to transcript on button click     
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
                    placeholderTextColor="#d3d3d3"
                    //onChangeText={(test_user) => this.setEmail(test_user)}
                    //can we just set the variable here?
                   // onChangeText={this.handleUserChange}
                   onChangeText={(test_user) => setUser({test_user})}
                   //value = {this.test_user}
                   //maybe wait till we hit enter
                    /> 
                    
                </View>
            
                <View style={styles.break}/>
                <View style={styles.right_screen}>
                <Button 
                            //onPress={this.onClickLogin}
                            onPress={() =>navigation.navigate('Transcripts')}
                            toStyle={styles.loginBtn}
                            textStyle={styles.loginText}
                        >
                       Login
                </Button>
                <View style={styles.btn_break}/>
                <Button 
                            onPress={() =>navigation.navigate('Transcripts')}
                            //onPress={this.onClickLogin}
                            toStyle={styles.regBtn}
                            textStyle={styles.regText}
                        >
                       Register
                </Button>
               </View>
                
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
        borderRadius: 50,
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
        borderRadius: 50, 
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
    regText: {
        fontSize: 22,
        color: '#04a4f4', 
        textAlign: 'center',
    },
    loginBtn: {
       
       // flex: 2,
        paddingRight: 30,
        paddingLeft: 30,
        paddingVertical: 10,
        paddingHorizontal:15,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#04a4f4',
        borderColor: '#04a4f4',
        //padding: 10,
        borderRadius: 50,
        width: '18%',
        //marginLeft: 20,
    },
    regBtn: {
       
        // flex: 2,
         paddingRight: 30,
         paddingLeft: 30,
         paddingVertical: 10,
         paddingHorizontal: 15,
         justifyContent: 'center',
         borderWidth: 2,
         backgroundColor: '#fff',
         borderColor: '#04a4f4',
         //padding: 10,
         borderRadius: 50,
         //marginLeft: 20,
         width: '18%',
     },
    break: {
        height: '3%',
        
    },
    btn_break: {
        width: '5%',
        
    },
    right_screen: {
        //width: '49.8%',
       // height: '94%',
        alignSelf: 'center',
       // keyboardDismissMode: 'none',
        fontSize:32,
        flexDirection: 'row',
       // color: '#fff', 
    },
    textbox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '2%',
    },
    text: {
        fontSize: 22,
        textAlign: 'left',
        width: '70%',
        paddingRight: '2.5%',
    },
    highlight: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    edit_text: {
        width: '27.5%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },
});

export default Profile;