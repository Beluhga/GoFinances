import React from 'react';
import { TextInputProps } from 'react-native';


import {
    Container
} from './styles';

// para pode usar em testes
interface Props extends TextInputProps{
    active?: boolean;
}

export function Input({
    active = false,
    ...rest
} : Props){
    return(
        <Container 
            active={active}
            {...rest} 
        />
    )
}