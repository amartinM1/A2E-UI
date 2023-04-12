import React, {Component,useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import Collapsible from 'react-native-collapsible';
//import '../components/app.css';
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
import { setTranscript } from '../redux/action';

// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}

/*function Collapsible() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <React.Fragment>
            <div style={Styles.header} {...getToggleProps()}>
                {isExpanded ? 'Collapse' : 'Expand'}
            </div>
            <div {...getCollapseProps()}>
                <div style={Styles.content}>
                    Transcript <br/><br/>
                    Click again to hide...
                </div>
            </div>
            <Collapsible collapsed={isCollapsed}>
                <SomeCollapsedView />
            </Collapsible>
        </React.Fragment>
    );
}*/

async function toggleCollapsed({isCollapsed, setCollapsed}) {
    console.log("collopased");
    setCollapsed(!isCollapsed);
    return;
}

async function GetMessages({store}) {
    var messages = [];
    
    await database()
    .ref(`/users/${store.name}/transcripts`)
        .once("value") 
        .then((snapshot) => {
            snapshot.forEach((child) => {
                var message = {};
                message['msg'] = child.key;
                messages.push(message);

            })
        });
    console.log(messages);
    return messages;
}

function TextBox({message, reload, store, dispatch}) {
    function select(value) {
        console.log(value);
        dispatch(setTranscript(value));
    }
    return (
        <View style={styles.textbox}>
            <Button 
                style={styles.time}
                onPress={() => select(message.msg)} 
                textStyle={styles.highlight}
                setEditable={false}
                multiline={true}
            >
                {message.msg}
            </Button>
        </View>
    );
};

let itemsRef = database().ref('/items');

function Transcripts({navigation}) {
    const [messages, setMessages] = useState([{msg: "Loading..."}]);
    const store = useSelector(state => state.userReducer); 
    const dispatch = useDispatch();
    const [isCollapsed, setCollapsed] = useState(true);

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
            dispatch={dispatch}
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
    content: {
        width: "100%",
        backgroundColor: "#eeeeee",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
});

export default Transcripts;