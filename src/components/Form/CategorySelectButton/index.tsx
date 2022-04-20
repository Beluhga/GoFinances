import React from 'react';

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
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
    )
}