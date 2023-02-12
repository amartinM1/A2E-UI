import React, {Component, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import * as User from './profile';
import ServerConnection from '../server/server';
//import TcpSocket from 'react-native-tcp-socket';
import TcpSocket from 'react-native-tcp-socket';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ScrollView,
    AsyncStorage,
    FlatList, 
} from 'react-native';



// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}

function StartCamera() {
// launch ssh script? 
}


// async and await make function wait to finish read before returning
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

// database functions 
async function GetMessages() {
    var messages = [];
    await database()
        .ref(`/users/${User.username}/transcripts/${User.current_transcript}/messages`)
        .once("value") 
        .then((snapshot) => {
            snapshot.forEach((child) => {
                var message = {};
                message['time'] = child.key;
                message['msg'] = child.val();
                messages.push(message);
            })
            var message = {};
            message['time'] = '+';
            message['msg'] = "add message";
            messages.push(message);
        });
    //console.log(messages);
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

async function ReceieveData({data, reload}) {
    var message = [];
    message.msg = data;
    message.time = await getTime();
    EditMessage(data);
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

function Home({navigation}) {
    const [messages, setMessages] = useState([{"msg": "Loading...", "time": ""}]);

    const fetchData = async () => {
        const data = await GetMessages();
        setMessages(data);
    };

    useEffect(() => {
        fetchData();
        //ServerConnection(() => ReceieveData(), () => fetchData());
    }, []);

    const server = TcpSocket.createServer(function(socket) {
        socket.on('data', (data) => {
            socket.write('Echo server ' + data);
            console.log('receieved data ' + data);
        });
    
        socket.on('error', (error) => {
            console.log('An error ocurred with client socket ', error);
        });
    
        socket.on('close', (error) => {
            console.log('Closed connection with ', socket.address());
        });
    }).listen({ port: 5000, host: '' });
    
    server.on('error', (error) => {
        console.log('An error ocurred with the server', error);
    });
    
    server.on('close', () => {
        console.log('Server closed connection');
    });

    const renderItem = ({item}) => (
        <TextBox 
            message={item} 
            reload={() => fetchData()}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>A2E</Text>
            </View>
            <View style={styles.top_container}>
                <Button 
                    onPress={() => navigation.navigate('Launch')}
                    toStyle={styles.profile}
                    textStyle={styles.profile_text}
                >
                    Profile
                </Button>
                <Button 
                    onPress={() => navigation.navigate('Launch')}
                    toStyle={styles.settings}
                    textStyle={styles.settings_text}
                >
                    Settings
                </Button>
            </View>
            <View style={styles.main_container}>
                <View style={styles.left_screen}>
                    <Button 
                        onPress={() => StartCamera()}
                        toStyle={styles.button}
                        textStyle={styles.button_text}
                    >
                        Start Camera
                    </Button>
                </View>
                <View style={styles.verticle_line}></View>
                <FlatList style={styles.right_screen}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.time}
                    removeClippedSubviews={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    background_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F5F5F5',
    },
    top_container: {
        width: '100%',
        height: '7.5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    logo: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#04a4f4',
        textAlign: 'left',
        marginLeft: '1%',
        marginTop: '0.5%',
    },
    profile_text: {
        fontSize: 25,
        paddingTop: 4,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#04a4f4',
        textAlign: 'right',
    },
    settings_text: {
        fontSize: 25,
        paddingTop: 4,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#04a4f4',
        textAlign: 'center',
    },
    profile: {
        width: '25%',
    },
    settings: {
        width: '25%',
    },
    main_container: {
        width: '100%',
        height: '92.5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
    },
    left_screen: {
        width: '49.8%',
        height: '100%',
    },
    right_screen: {
        width: '49.8%',
        height: '94%',
        alignSelf: 'center',
        keyboardDismissMode: 'none', 
    },
    verticle_line:{
        height: '90%',
        width: '0.2%',
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
        width: '50%',
        marginTop: '10%',
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
        marginBottom: '4%',
        textAlign: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: '800',
        marginTop: '5%',
        marginBottom: '2.5%',
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Savoye LET',
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
})

export default Home;