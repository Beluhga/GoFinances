import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native';


import {
    Container,
    Icon,
    Title,
    Button,
} from './styled'

const icons = {
    up: 'arrow-circle-o-up',
    down: 'arrow-circle-o-down',
}

interface Props extends RectButtonProps{
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
    onPress: () => void;
}

export function TransactionTypeButton({
    title,
    type,
    isActive, 
    onPress,
    ...rest}
    : Props){
    return(
        <TouchableWithoutFeedback
            onPress={onPress}
        >
    <Container
     isActive={isActive}
     type={type} 
    > 
        
            <Button
              {...rest} 
            >
                <Icon 
                    name={icons[type]}
                    type={type}
                />
                <Title>
                    {title}
                </Title>
            </Button>
    </Container>
    </TouchableWithoutFeedback>


    )
}