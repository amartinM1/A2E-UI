import React, {Component,useState} from 'react';

import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    ScrollView,
    AsyncStorage,
} from 'react-native';

function EditText({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.edit_text}>
            <Text style={styles.highlight}>{children}</Text>
        </TouchableOpacity>
    );
}

function Profile({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.profile}>
                <Text style={styles.profile_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function Settings({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.settings}>
                <Text style={styles.settings_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function CameraButton({onPress, children}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.button_text}>{children}</Text>
        </TouchableOpacity>
    );
}

function StartCamera() {

}

const TextBox = (props) => {
    const[canEdit, setEdit] = useState(false);
    const[color, setColor] = useState('black');
    function toggle() {
        if(!canEdit) {
            setColor('gray');
        }
        else {
            setColor('black');
        }
        setEdit(!canEdit);
    }
    return (
        <View style={styles.textbox}>
            <EditText onPress={() => toggle()} setEditable={canEdit}>{props.time}</EditText>
            <TextInput style={styles.text} color={color} editable={canEdit} multiline={true}>{props.msg}</TextInput>
        </View>
    )
}

function Home({navigation}) {
    const[canEdit, setEdit] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>A2E</Text>
            </View>
            <View style={styles.top_container}>
                <Profile onPress={() => navigation.navigate('Launch') }>Profile</Profile>
                <Settings onPress={() => navigation.navigate('Launch') }>Settings</Settings>
            </View>
            <View style={styles.main_container}>
                <View style={styles.left_screen}>
                    <CameraButton onPress={() => StartCamera()}>Start Camera</CameraButton>
                </View>
                <View style={styles.verticle_line}></View>
                <ScrollView style={styles.right_screen}>
                    <TextBox time='1:03' msg="Hi, my name is Maya."/>        
                    <TextBox time='1:04' msg="What's your name?"/>  
                    <TextBox time='1:10' msg="It is really nice to meet you Alex!"/>  
                    <TextBox time='1:13' msg="How was your day?"/>  
                    <TextBox time='1:20' msg="Where do you want to meet up? 
                    We could go to the beach or we could go to the mall."/>  
                    <TextBox time='1:28' msg="The beach sounds perfect to me."/> 
                    <TextBox time='1:30' msg="I'm so excited."/> 
                    <TextBox time='1:32' msg="Will the weather be good?"/>   
                    <TextBox time='1:38' msg="What time did you say to meet up?"/>   
                    <TextBox time='1:42' msg="Noon."/>   
                    <TextBox time='1:48' msg="What day?"/>   
                    <TextBox time='1:53' msg="Perfect!"/>
                    <TextBox time='1:57' msg="Should I bring anything?"/>
                    <TextBox time='2:03' msg="I can do that."/>
                    <TextBox time='2:10' msg="I'll see you on Saturday."/>  
                    <TextBox time='2:15' msg="Bye."/>       
                </ScrollView>
            </View>
        </View>
    );
    //<Text style={styles.heading}>Translated Text</Text>
}

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
        alignItems: 'flex-start',
        marginTop: '2%',
    },
    text: {
        fontSize: 25,
        textAlign: 'left',
        width: '72.5%',
        paddingRight: '2.5%',
    },
    highlight: {
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
    },
    edit_text: {
        width: '20%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },
})

export default Home;