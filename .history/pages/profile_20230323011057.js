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


// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}


async function GetMessages() {
    var messages = [];
    /*const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
    });*/
    await database()
        //.ref(`/users/${User.username}/transcripts/${User.current_transcript}/messages`)
        .ref(`/users/${username}/transcripts/${current_transcript}/messages`)
        .once("value") 
        .then((snapshot) => {
            snapshot.forEach((child) => {
               var message = {};
               message['time'] = child.key;
               //console.log(child.val());
               message['msg'] = child.val();
               messages.push(message);
            })
        
        });
   // console.log(messages);
    return messages;
}

let itemsRef = database().ref('/items');

function Profile({navigation}) {
    const [email, setEmail] = useState('username');
    const [messages, setMessages] = useState([{msg: "Loading...", time: ""}]);


    /*const fetchData = async () => {
        const data = await GetMessages();
        console.log(data);
        setMessages(data);
        return data;

    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const renderItem = ({item}) => (
        <Text
            message={item} 
            reload={() => fetchData()}
        />
      
    );
    ///////////////added this
    React.useEffect(() => {
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          const items = Object.values(data);
          setItemsArray(items);
        });
      }, []);*/
        
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
                <View style={styles.right_screen}>
                <Button 
                            onPress={() => navigation.navigate('Transcripts')}
                            toStyle={styles.loginBtn}
                            textStyle={styles.loginText}
                        >
                       Login
                </Button>
                <View style={styles.break}/>
                <Button 
                            onPress={() => navigation.navigate('Transcripts')}
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
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#04a4f4',
        borderColor: '#04a4f4',
        //padding: 10,
        borderRadius: 50,
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
     },
    break: {
        height: '3%',
        
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