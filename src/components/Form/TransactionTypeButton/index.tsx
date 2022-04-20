import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Icon,
    Title,
} from './styled'

const icons = {
    up: 'arrow-circle-o-up',
    down: 'arrow-circle-o-down',
}

interface Props extends TouchableOpacityProps{
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export function TransactionTypeButton({
    title,
    type,
    isActive, 
    ...rest}
    : Props){
    return(
        <Container
        {...rest} 
        isActive={isActive}
        type={type} 
        > 

            <Icon 
                name={icons[type]}
                type={type}
            />
            <Title>
                {title}
            </Title>

        </Container>
    )
}