import React, {Component,useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Pressable
} from 'react-native';

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

function Home({navigation}) {
    
    const [buttonPresses, setButtonPresses] = useState(0);
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
                <View style={styles.right_screen}>

                <Text style={styles.text}>{buttonPresses}</Text>

                <Pressable style={({pressed}) => [{backgroundColor : pressed ? "yellow": "black"},styles.text]}>
                    onPress={() => {
                        setButtonPresses(buttonPresses +1);
                    }}

                    <Text style={styles.text}>Hi my name is Maya.  <Text style={styles.highlight}>1:03</Text></Text>
                    <Text style={styles.text}> What is your name?   <Text style={styles.highlight}>1:07</Text></Text>

                </Pressable>

                </View>
            </View>
        </View>
    );
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
        fontSize: 23,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#04a4f4',
        textAlign: 'right',
    },
    settings_text: {
        fontSize: 23,
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
        height: '100%',
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
    highlight: {
        fontWeight: '700',
        textAlign: 'right',
      },
      text: {
        fontSize: 32,
       
      },
})

export default Home;