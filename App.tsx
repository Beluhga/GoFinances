import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';

import theme from './src/global/styles.ts/theme';

import {Routes} from './src/routes/';

import { AuthProvider, useAuth } from './src/hooks/auth';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStorageLoading} = useAuth();

  if(!fontsLoaded || userStorageLoading){
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider theme={theme}> 
  
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    
  </ThemeProvider>
  </GestureHandlerRootView>

  )
}


/* o ThemeProvider é um contesto q disponibiliza pros components q faz desse contesto
os temas da aplicação

*/