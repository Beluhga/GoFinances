import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from './styles';

interface Props {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    up: 'arrow-circle-o-up',
    down: 'arrow-circle-o-down',
    total: 'dollar'
}

export function HightlightCard({
    type,
    title, 
    amount, 
    lastTransaction} 
    : Props){
    return(
        <Container type={type} /*Type vindo de index.tsx*/  
        > 
            <Header>
                <Title 
                    type={type}>
                    {title}
                </Title>
                <Icon 
                    name={icon[type]} 
                    type={type} /> 
            </Header>

            <Footer>
                <Amount type={type}>
                    {amount}
                </Amount>
                <LastTransaction type={type}>
                    {lastTransaction}
                </LastTransaction>
            </Footer>
        </Container>
    )
}
