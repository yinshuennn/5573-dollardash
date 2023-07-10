import React, { createContext, useState } from 'react';

export const SelectedOptionContext = createContext();

export const SelectedOptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const updateSelectedOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, updateSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};