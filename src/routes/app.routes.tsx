import React from 'react';
import { Platform} from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useTheme} from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { Dashboard } from '../screens/Dashboard';
import {Register} from '../screens/Register';
import {Resume} from '../screens/Resume';


const {Navigator, Screen} = createBottomTabNavigator();


export function AppRoutes(){
    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 70,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color}) =>
                    <FontAwesome
                        name="align-left"
                        size={size}
                        color={color}
                    />
                    )
                }}
            />

            <Screen 
                name="Casdastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color}) =>
                    <FontAwesome
                        name="dollar"
                        size={size}
                        color={color}
                    />
                    )
                }}
            />

            <Screen 
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({ size, color}) =>
                    <FontAwesome
                        name="pie-chart"
                        size={size}
                        color={color}
                    />
                    )
                }}
            />
 
        </Navigator>
        

    )
}