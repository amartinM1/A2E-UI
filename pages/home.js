import React, {Component, useEffect, useState, useRef, useCallback, useReducer, useMemo} from 'react';
import database from '@react-native-firebase/database';
import TcpSocket from 'react-native-tcp-socket';
import dgram from 'react-native-udp';
import events from "events"
import Voice from '@react-native-voice/voice';
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native'
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
    LogBox
} from 'react-native';
import appendSign from "nlp";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


events.EventEmitter.defaultMaxListeners = 100

// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}

function StartCamera() {
      return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding:25}}
        >
            <WebView
                source={{ uri: "http://10.136.176.29:5000/video_feed" }} // Set the URL you want to load
                style={{ width:450, height:500 }}
            />
        </View>
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
async function GetMessages({store}) {
    var messages = [];
    await database()
        .ref(`/users/${store.name}/transcripts/${store.transcript}/messages`)
        .once("value") 
        .then((snapshot) => {
            snapshot.forEach((child) => {
                var message = {};
                message['time'] = child.key;
                message['msg'] = child.val()['msg'];
                message['usr'] = child.val()['usr'];
                messages.push(message);

            })
            var message = {};
            message['time'] = '+';
            message['msg'] = "add message";
            message['usr'] = "asl";
            messages.push(message);
        });
    //console.log(messages);
    return messages;
}

async function EditMessage({message, store}) {
    await database()
        .ref(`/users/${store.name}/transcripts/${store.transcript}/messages/${message.time}`)
        .update({
            ['msg'] : message.msg,
            ['usr'] : message.usr,
        })
        .then(() => console.log(`updated message at: ${message.time}`));
    return;
}

async function DeleteMessage({message, store}) {
    await database()
        .ref(`/users/${store.name}/transcripts/${store.transcript}/messages/${message.time}`)
        .remove()
        .then(() => console.log(`deleted message at: ${message.time}`));
    return;
}

async function ReceiveData(data, usr, reload, {store}) {
    console.log("store name pt 2 " + store.name);
    var message = {msg: "", time: "", usr: ""};
    message.usr = usr;
    message.msg = data;
    message.time = await getTime();
    EditMessage({message, store});
    reload();
}

function TextBox({message, reload, store}) {
    const [canEdit, setEdit] = useState(false);
    const [color, setColor] = useState('black');
    useEffect(() => {
        if(message.time == '+' && !canEdit) {
            setColor('#04a4f4');
        }
        else if(message.usr == "voice"  && !canEdit){
            setColor('#039BE5');
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
                    message.usr = "asl";
                    message.time = await getTime();
                    if(message.msg.length == 0) {
                        DeleteMessage({message, store});
                    }
                    else {
                        EditMessage({message, store});
                    }
                }
                else {
                    setColor('#04a4f4');
                }
            }
    
            else {
                setColor('black');
                if(message.msg.length == 0) {
                    DeleteMessage({message, store});
                }
                else {
                    EditMessage({message, store});
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
    const [messages, setMessages] = useState([{msg: "Loading...", time: "", usr: ""}]);
    const [tcp_server, setTCPServer] = useState(TcpSocket.createServer());
    const [tcp_connected, setTCPConnected] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const [speechResult, setSpeechResult] = useState('');
    const [loadingSpeech, setLoadingSpeech] = useState(false);
    const [speechButton, setSpeechButton] = useState('Start Speech to Text');
    const [predictionsButton, setPredictionsButton] = useState('Start Predictions');
    const [currSen, setCurrSen] = useState([]);             //Emily added these three
    const [tempText, setTempText] = useState([]);
    const [currLetters, setCurrLetters] = useState("");
    const socket = 1;
    const isFocused = useIsFocused()

    const store = useSelector(state => state.userReducer); 

    tcp_server.on('error', (error) => {
        console.log('An error ocurred with the server', error);
    });

    tcp_server.on('close', () => {
        console.log('Server closed connection');
    });

    //console.log("home was ran");


    // udp_socket.on('error', (error) => {
    //     console.log('An error occured with the UDP Socket');
    // });

    // useEffect(() => {
    //     if(!udp_connected) {
    //         udp_socket.bind(6000, '10.136.140.5');
    //         setUDPSocket(udp_socket);
    //         setUDPConnected(true);
    //     }

    //     udp_socket.once('listening', function() {
    //         udp_socket.send('Hello World!', 0, 65536, 3000, '10.136.255.136', function(err) {
    //             if (err) throw err
    //             console.log('Message sent!')
    //         })
    //     });
    // });

    const fetchData = async () => {
        const data = await GetMessages({ store });
        setMessages(data);
    };

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    useEffect(() => {
        if(!tcp_connected) {
            const server = TcpSocket.createServer(function(tcp_socket) {
                tcp_socket.on('data', (data) => {
                    tcp_socket.write('Echo server ' + data);
                    console.log('receieved data ' + data);
                    // if (predictionsButton == 'Stop Predictions') {

                    let [answerText, curr_sen, temp, curr_letters] = appendSign(String(data), currSen, tempText, currLetters);  //NLP Processing
                    setCurrLetters(curr_letters);
                    setCurrSen(curr_sen);
                    setTempText(temp);

                    ReceiveData(answerText, "asl", fetchData, {store});
                    // }
                });
                    
                tcp_socket.on('error', (error) => {
                    console.log('An error ocurred with client socket ', error);
                });
                    
                tcp_socket.on('close', (error) => {
                    console.log('Closed connection with ', tcp_socket.address());

                });
            }).listen({ port: 4001, host: '10.136.218.237' , reuseAddress: true });
            console.log('Creating TCP Server');
            setTCPServer(server);
            setTCPConnected(true);
        }

    }, []);

    const speechStartHandler = e => {
        console.log('speechStart successful', e);
    };
    
    const speechEndHandler = e => {
        setLoadingSpeech(false);
        console.log('stop handler', e);
    };
    
    const speechResultsHandler = e => {
        const text = e.value[0];
        console.log("speech text output: " + text);
        console.log("the store name is: " + store.name);
        ReceiveData(text, "voice", fetchData, {store});
        setSpeechResult(text);
    };
    
    const startRecording = async () => {
        setLoadingSpeech(true);
        try {
            await Voice.start('en-Us');
        }
        catch (error) {
            console.log('error', error);
        }
    };
    
    const stopRecording = async () => {
        try {
            await Voice.stop();
            setLoadingSpeech(false);
        } 
        catch (error) {
            console.log('error', error);
        }
    };
    
    const toggleSpeechButtons = () => {
        if(speechButton == "Start Speech to Text") {
            startRecording()
            setSpeechButton('Stop Speech to Text');
        }
        else if (speechButton == "Stop Speech to Text") {
            stopRecording()
            setSpeechButton('Start Speech to Text');
        }
    };

//use state for dynamically creating speech fiiedl when the speechresult is handled
    const [val, setVal] = useState([]); //this is esssentially the speechresult use state 
    const handleAdd =()=> {
        const speech_msg = [...val,[]]
        setVal(abc)
    }

    const handleChange=(onChangeValue,i)=>{
        const inputdata=[...val]
        inputdata[i]=onChangeValue.target.value;
        setVal(inputdata)
       }

    const togglePredictionButtons = () => {
        if(predictionsButton == "Start Predictions") {
            setPredictionsButton('Stop Predictions');
        }
        else if (predictionsButton == "Stop Predictions") {
            setPredictionsButton('Start Predictions');
            setCurrSen([]);         //Reset NLP vars
            setTempText([]);
            setCurrLetters("");
        }
    };

    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const renderItem = ({item}) => (
        <TextBox 
            message={item} 
            reload={() => fetchData()}
            store={store}
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

                {/* <Button 
                    onPress={() => navigation.navigate('Speech_Text')}
                    toStyle={styles.settings}
                    textStyle={styles.settings_text}
                >
                    Speech
                </Button> */}
            </View>
            <View style={styles.main_container}>
                <View style={styles.left_screen}>
                    <Button 
                        onPress={() => setShouldShow(!shouldShow)}
                        toStyle={styles.button}
                        textStyle={styles.button_text}>
                        Start Camera
                    </Button>
                    {shouldShow ?
                        (
                            <StartCamera/>
                        ) : null}
                </View>
                <View style={styles.verticle_line}></View>
                
                <View style={styles.right_screen}>
                    <View style={styles.double_buttons}>

                        <TouchableOpacity onPress={togglePredictionButtons} style={styles.buttons_2}>
                            <Text style={styles.text_2}>{predictionsButton}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleSpeechButtons} style={styles.buttons_2}>
                            <Text style={styles.text_2}>{speechButton}</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
        

                    <FlatList style={styles.messages}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.time}
                        removeClippedSubviews={false}
                    />
                </View>
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
        keyboardDismissMode: 'none', 
    },
    messages: {
        width: '100%',
        height: '94%',
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
        marginTop: '5%',
    },
    button_text:{
        marginBottom: 2,
        marginTop: 2,
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    double_buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: 10,
    },
    buttons_2:{
        backgroundColor: '#04a4f4',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 10,
        width: '45%',
        backgroundColor: '#04a4f4',
    },
    text_2:{
        textAlign: 'center',
        marginBottom: 2,
        marginTop: 2,
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    textInputStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height:100,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4,
        color: '#000',
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
        padding: 20,
      },
      Ilogo: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
      },

})

export default Home;