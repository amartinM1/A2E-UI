import React, {Component, useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import database from '@react-native-firebase/database';
import * as User from './profile';
import TcpSocket from 'react-native-tcp-socket';
import dgram from 'react-native-udp';
import {decode, encode} from 'base-64'
/*if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}*/

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
    Image,
    EventEmitter,
} from 'react-native';

// Video Object
/*function Frames({msg}) {
   /* return (
        <Image 
            style={styles.image} 
            source={{uri: `data:image/png;base64,${msg}`}}
        />
    ); 
    let url = msg;
    if (msg.indexOf("data:image/png;base64,") > -1) {
      let decodedPng = base64.decode(
        msg.replace("data:image/png;base64,", "")
      );
      let blob = new Blob([decodedPng], { type: "image/png+xml" });
      url = URL.createObjectURL(blob);
    }
    return (<img src={url}/>);    
}*/


// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}


function StartCamera({Frame}) {
    // display frame
    var image = 'data:image/jpg;base64,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';
    console.log("display");
    const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
    return (
       <Image 
            source={{uri: base64Icon}}
        />
    );
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

function Home({navigation}) {
    const [messages, setMessages] = useState([{msg: "Loading...", time: ""}]);
    const [tcp_server, setTCPServer] = useState(TcpSocket.createServer());
    const [udp_socket, setUDPSocket] = useState(dgram.createSocket({type: 'udp4', reusePort: true}));
    const [tcp_connected, setTCPConnected] = useState(false);
    const [udp_connected, setUDPConnected] = useState(false);
    const [frame, setFrame] = useState([]);
    const [shouldShow, setShouldShow] = useState(false);
    const [getFrame, setGetFrame] = useState(true);

    tcp_server.on('error', (error) => {
        console.log('An error ocurred with the server', error);
    });

    tcp_server.on('close', () => {
        console.log('Server closed connection');
    });

    udp_socket.on('message', async function(msg, rinfo) {
        if(getFrame) {
            setFrame(encode(String.fromCharCode.apply(null, new Uint8Array(JSON.parse(JSON.stringify(msg))["data"]))));
            console.log(frame);
            await setGetFrame(false);
        }
        else {
            setTimeout(() => {
                setGetFrame(true);
            }, 1000);
        }
        //setFrame(encode(String.fromCharCode.apply(null, new Uint8Array(JSON.parse(JSON.stringify(msg))["data"]))));
        //console.log('got a UDP message!!', JSON.parse(JSON.stringify(msg))["data"]);
    });

    udp_socket.on('error', (error) => {
        console.log('An error occured with the UDP Socket');
    });

    useEffect(() => {
        if(!udp_connected) {
            udp_socket.bind(6000, '10.136.140.5');
            setUDPSocket(udp_socket);
            setUDPConnected(true);
        }

        udp_socket.once('listening', function() {
            udp_socket.send('Hello World!', 0, 65536, 3000, '10.136.63.60', function(err) {
                if (err) throw err
                console.log('Message sent!')
            })
        });
    });

    const fetchData = async () => {
        const data = await GetMessages();
        setMessages(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(!tcp_connected) {
            const server = TcpSocket.createServer(function(tcp_socket) {
                tcp_socket.on('data', (data) => {
                    tcp_socket.write('Echo server ' + data);
                    console.log('receieved data ' + data);
                    ReceiveData(String(data), fetchData);
                });
                    
                tcp_socket.on('error', (error) => {
                    console.log('An error ocurred with client socket ', error);
                });
                    
                tcp_socket.on('close', (error) => {
                    console.log('Closed connection with ', tcp_socket.address());
                });
            }).listen({ port: 4000, host: '10.136.140.5' , reuseAddress: true });
            console.log('Creating TCP Server');
            setTCPServer(server);
            setTCPConnected(true);
        }
    }, []);

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
                    onPress={() => navigation.navigate('Profile')}
                    toStyle={styles.profile}
                    textStyle={styles.profile_text}
                >
                    Profile
                </Button>
                <Button 
                    onPress={() => navigation.navigate('Settings')}
                    toStyle={styles.settings}
                    textStyle={styles.settings_text}
                >
                    Settings
                </Button>
            </View>
            <View style={styles.main_container}>
                <View style={styles.left_screen}>
                    <Button 
                        onPress={() => setShouldShow(!shouldShow)}
                        toStyle={styles.button}
                        textStyle={styles.button_text}
                    >
                        Start Camera
                    </Button>
                    {shouldShow ?
                            (
                            <StartCamera
                                Frame={frame}
                            />
                            ) : null}
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
    image: {
        width: '100%',
        
    },
    Icontainer: {
        paddingTop: 50,
      },
      ItinyLogo: {
        width: 50,
        height: 50,
      },
      Ilogo: {
        width: 66,
        height: 58,
      },
})

export default Home;