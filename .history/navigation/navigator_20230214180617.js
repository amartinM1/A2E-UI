import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pages
import Launch from '../pages/launch';
import Home from '../pages/home';
import Profile from '../pages/profile';
import Settings from '../pages/settings';

//stacks
const LaunchStack = createNativeStackNavigator();

//Launch Page Stack
function Navigator() {
    return (
        <NavigationContainer>
            <LaunchStack.Navigator>
                <LaunchStack.Screen
                    name="Launch"
                    component={Launch}
                    options={{headerShown: false}}
                />
                <LaunchStack.Screen 
                    name="Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <LaunchStack.Screen 
                    name="Profile"
                    component={Profile}
                />
                <LaunchStack.Screen 
                    name="Settings"
                    component={Settings}
                />
            </LaunchStack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;