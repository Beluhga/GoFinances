import React from 'react';
import { TouchableWithoutFeedback  } from 'react-native';

import {
    Container,
    Category,
    Icon,
} from './styles'

interface Props {
    title: string;
    onPress: () => void; // para abrir e fecha a lista de CategorySelect
}

export function CategorySelectButton({
    title,
    onPress
}: Props){
    return(
        <TouchableWithoutFeedback 
        onPress={onPress}
        >

        <Container>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
        </TouchableWithoutFeedback>

    )
}