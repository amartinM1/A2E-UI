import React, {Component,useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import { MyProvider } from '../components/myContext.js';
import MyComponent from '../components/myComponent.js';
import * as User from './profile';
import {myState} from './profile';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, 
    TextInput,
    ScrollView,
    FlatList,
} from 'react-native';

export const username = "test";
export const current_transcript = "test log";


// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}

async function getTime() {
    var hours = await new Date().getHours(); //Current Hours
    var min = await new Date().getMinutes(); //Current Minutes
    var sec = await new Date().getSeconds(); //Current Seconds
    hours += '';
    min += '';
    sec += '';
    if(hours.length == 1) {
        hours = '0' + hours;
    }
    if(min.length == 1) {
        min = '0' + min;
    }
    if(sec.length == 1) {
        sec = '0' + sec;
    }
    var date = (hours + ':' + min + ':' + sec);
    console.log('current time: ' + date);
    return date;
}
async function GetMessages() {
    var messages = [];
    const [test_user, setUser] = myState();
    
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


async function EditMessage(message) {
    await database()
        .ref(`/users/${User.username}/transcripts/${User.current_transcript}/messages`)
        .update({
            [message.time] : message.msg,
        })
        .then(() => console.log(`updated message at: ${message.time}`));
    return;
}

async function DeleteMessage(message) {
    await database()
        .ref(`/users/${User.username}/transcripts/${User.current_transcript}/messages/${message.time}`)
        .remove()
        .then(() => console.log(`deleted message at: ${message.time}`));
    return;
}

async function ReceiveData(data, reload) {
    var message = {msg: "", time: ""};
    message.msg = data;
    message.time = await getTime();
    EditMessage(message);
    reload();
}

function TextBox({message, reload}) {
    const[canEdit, setEdit] = useState(false);
    const[color, setColor] = useState('black');
    useEffect(() => {
        if(message.time == '+' && !canEdit) {
            setColor('#04a4f4');
        }
    });
    async function toggle() {
        if(!canEdit) {
            if(message.time == '+') {
                setColor('#98dcfd');
            }
            else {
                setColor('gray');
            }
        }
        else {
            if(message.time == '+') {
                if(message.msg != "add message") {
                    setColor('black');
                    message.time = await getTime();
                    if(message.msg.length == 0) {
                        DeleteMessage(message);
                    }
                    else {
                        EditMessage(message);
                    }
                }
                else {
                    setColor('#04a4f4');
                }
            }
            else {
                setColor('black');
                if(message.msg.length == 0) {
                    DeleteMessage(message);
                }
                else {
                    EditMessage(message);
                }
            }
        }
        setEdit(!canEdit);
        reload();
    }
    function saveChange(value) {
        message.msg = value;
    }
    return (
        <View style={styles.textbox}>
            <Button 
                style={styles.time}
                onPress={() => toggle()} 
                toStyle={styles.edit_text}
                textStyle={styles.highlight}
                setEditable={canEdit}
            >
                {message.time}
            </Button>
            <TextInput 
                style={styles.text} 
                color={color} 
                editable={canEdit} 
                multiline={true}
                onChangeText={(value) => saveChange(value)}
            > 
                {message.msg}
            </TextInput>
        </View>
    );
};
let itemsRef = database().ref('/items');

function Transcripts({navigation}) {
    //const [email, setUser] = myState();
    const [messages, setMessages] = useState([{msg: "Loading...", time: ""}]);


    const fetchData = async () => {
        const data = await GetMessages();
        console.log(data);
        setMessages(data);
        return data;

    };
    
    useEffect(() => {
        fetchData();
    },[]);
    
    const renderItem = ({item}) => (
        <TextBox
            message={item} 
            reload={() => fetchData()}
        />
      
    );
    /*///////////////added this
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
             <FlatList style={styles.right_screen}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.time}
                    removeClippedSubviews={false}
                />
            
                <View style={styles.break}/>
               
               
                
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
    right_screen: {
        width: '49.8%',
        height: '94%',
        alignSelf: 'center',
        keyboardDismissMode: 'none',
        fontSize:32,
        color: '#04a4f4', 
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

export default Transcripts;