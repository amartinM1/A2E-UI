import React from 'react';
import { View, Text,useContext } from 'react-native';
import { MyProvider } from './myContext';

const MyComponent = () => {
  const { test_user, setUser } = useContext(MyProvider);
  return (
    <View>
      <Text>{test_user}</Text>
    </View>
  );
}

export default MyComponent;