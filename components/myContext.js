import React, { createContext, useState, useReducer} from 'react';

export const MyContext = createContext();

export const MyProvider = ({ initialState, reducer, children }) => (
  //const [ test_user, setUser ] = useState('');
 // <MyContext.Provider user= {useReducer(reducer, initialState)}>
 <MyContext.Provider user= {useState('', initialState)}>
    {children}
  </MyContext.Provider>

  /*return (
    <MyContext.Provider value={{test_user, setUser }}>
      {children}
    </MyContext.Provider>

  );*/
 
);
export const useStateValue = () => useContext (MyContext);