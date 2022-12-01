/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import Component from 'react';
 import type {Node} from 'react';

 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
  * LTI update could not be added via codemod */

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

 const Section = ({children, title}): Node => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
    
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
  // var br = document.createElement("br");
  // title.appendChild(br);
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.F5F5F5,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
       />

        
              <View style={styles.top_container}>

               
                <Text style={styles.logo}>A2E</Text>
                <Profile onPress={() => Launch()}>Profile</Profile>
                <Settings onPress={() => Launch()}>Settings</Settings>
              </View>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={backgroundStyle}>
                     <View style={styles.container}>
                      
                        <View style={styles.left_screen}>
                          <Text style={styles.body}>Video Feed</Text>
                          <CameraButton onPress={() => StartCamera()}>Start Camera</CameraButton>
                        </View> 
                          
                            <View style={styles.verticle_line}></View> 
                            
                            <View style={styles.right_screen}>
                            <Text style={styles.body}>Translated Text</Text>
                            
                            <Text style={styles.translation}>Hi my name is Maya.  <Text style={styles.highlight}>1:03</Text></Text>
                            <Text style={styles.translation}> What is your name?   <Text style={styles.highlight}>1:07</Text></Text>
                            
                             </View>
                      
                  </View>
                  
                </ScrollView>
              
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 3,
  
     paddingHorizontal: 24,
     alignItems: 'flex-end'
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     paddingVertical: 20,
     float: 'right',
     alignItems: 'center',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     textAlign :'right',
     marginLeft: '50%'
   },
   highlight: {
     fontWeight: '700',
     textAlign: 'right',
   },
   verticle_line:{
     height: '100%',
     width: 2,
     backgroundColor: '#909090',
     alignSelf: 'center',
     
   },
   logo: {
     fontSize: 45,
     fontWeight: 'bold',
     color: '#04a4f4',
     textAlign: 'left',
     width: '50%',
     marginLeft: '1%',
 },
 container: {
  flex: 1,
  flexDirection: 'column',


  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  backgroundColor: '#F5F5F5',
},
top_container: {
  width: '100%',
  height: '12.5%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  backgroundColor: '#F5F5F5',
},
main_container: {
  width: '100%',
  height: '92.5%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  alignContent: 'flex-end',
},
left_screen: {
  width: '49.8%',
  height: '100%',
},
right_screen: {
  width: '49.8%',
  height: '100%',
},
button: {
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: '#04a4f4',
  padding: 10,
  borderRadius: 50,
  width: 250,
},
body: {
  fontSize: 20,
  fontWeight: '700',
  color: 'black',
  marginBottom: 80,
  textAlign: 'center',
},
translation: {
  fontSize: 20,
  fontWeight: '700',
  color: 'black',
  justifyContent: 'left',
  
  textAlign: 'left',
},


profile_text: {
  fontSize: 23,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
  color: '#04a4f4',
  textAlign: 'center',
},
settings_text: {
  fontSize: 23,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
  color: '#04a4f4',
  textAlign: 'center',
},
profile: {
  marginLeft: '30%',
},
settings: {
  marginLeft: '3%',
},
button_text:{
  marginBottom: 2,
  marginTop: 2,
  fontSize: 25,
  fontWeight: '600',
  color: '#FFFFFF',
},
 });
 
 export default App;
 