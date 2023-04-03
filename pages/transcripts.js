import React, {Component,useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, 
    TextInput,
    ScrollView,
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
        });
   // console.log(messages);
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

async function ReceiveData({data, usr, reload}) {
    var message = {msg: "", time: "", usr: ""};
    message.usr = usr;
    message.msg = data;
    message.time = await getTime();
    EditMessage(message);
    reload();
}

function TextBox({message, reload, store}) {
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

let itemsRef = database().ref('/items');

function Transcripts({navigation}) {
    const [messages, setMessages] = useState([{msg: "Loading...", time: "", usr: ""}]);
    const store = useSelector(state => state.userReducer); 
    const dispatch = useDispatch();

    const fetchData = async () => {
        const data = await GetMessages({store});
        //console.log(data);
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
            store={store}
        />
    );
        
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
        paddingRight: 30,
        paddingLeft: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15, 
        borderColor: '#04a4f4',
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
        paddingRight: 30,
        paddingLeft: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15, 
        borderColor: '#04a4f4',
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