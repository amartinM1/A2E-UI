import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [ test_user, setUser ] = useState('');

  return (
    <MyContext.Provider value={{test_user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};