import React, {Component,useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
//import "./dynamicfont.js";
//import dynamicfont from './dynamicfont.js';
//import changeFont from './dynamicfont.js';

// Button Object
function Button({onPress, children, toStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={toStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    ); 
}

function Settings({navigation}) {
    const [fontSize, setFontSize] = useState(10);


    const changeFont = () => {
    
    setFontSize(fontSize+5);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.background_container}>
                <Text style={styles.logo}>A2E</Text>
            </View>
            <View style={styles.main_container}>
                <Button 
                            onPress={setFontSize(fontSize+5)}
                            toStyle={styles.button1}
                            textStyle={styles.button_text}
                        >
                        +
                </Button>
                <Button 
                            onPress={setFontSize(fontSize-5)}
                            toStyle={styles.button2}
                            textStyle={styles.button_text}
                        >
                        -
                </Button>

                <Text style={{fontSize: setFontSize(fontSize)}}>A2E</Text>
    
                
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
    button1: {
        alignItems: 'center',
        backgroundColor: '#04a4f4',
        padding: 5,
        borderRadius: 30,
        width: 100,
    },
    button2: {
        alignItems: 'center',
        backgroundColor: '#04a4f4',
        padding: 5,
        borderRadius: 30,
        width: 100,
    },
    button_text: {
        marginBottom: 2,
        marginTop: 2,
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
    },
  
});

export default Settings;