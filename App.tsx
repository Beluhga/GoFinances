import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-native-gesture-handler';




import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';

import theme from './src/global/styles.ts/theme';

import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes} from './src/routes/app.routes';



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
    <NavigationContainer>
    <AppRoutes />
    </NavigationContainer>
  </ThemeProvider>
  )
}


/* o ThemeProvider é um contesto q disponibiliza pros components q faz desse contesto
os temas da aplicação

*/