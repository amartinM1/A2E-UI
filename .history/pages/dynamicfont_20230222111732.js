import {StyleSheet} from 'react-native'
import React, {Component,useState} from 'react';


const dynamicfont = () =>{
const [fontSize, setFontSize] = useState(10);


const changeFont =() => {

setFontSize(fontSize+5);
}

const externalStyle = StyleSheet.create({


    fontOne:{
        fontSize: 15

    },
    fontTwo:{
        fontSize: 20

    },
    fontThree:{
        fontSize: 25

    },
    fontFour:{
        fontSize: 30

    }

})


}

export default dynamicfont;