import React from 'react'

import {
    Container,
    Title,
    Amount,
} from './styles';

interface Pops {
    title: string;
    amount: string;
    color: string;
}

export function HistoryCard({
    title,
    amount,
    color
}: Pops){
    return(
        <Container color={color}>
            <Title>{title}</Title>
            <Amount>{amount}</Amount>

        </Container>
    );
}