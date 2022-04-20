import React from 'react';
import { ThemeProvider } from 'styled-components';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';

import theme from './src/global/styles.ts/theme';

import { Register } from './src/screens/Register';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
  <ThemeProvider theme={theme}> 
    <Register />
  </ThemeProvider>
  )
}


/* o ThemeProvider é um contesto q disponibiliza pros components q faz desse contesto
os temas da aplicação

*/