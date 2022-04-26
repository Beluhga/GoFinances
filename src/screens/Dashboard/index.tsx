import React from 'react';
import { HightlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';


import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HightlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton

} from './styles'; // o estilo colocado com "View, Text..." dentro de styles para ficar mais pratico a manutenção

 export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){
    const data: DataListProps[]= [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento do site",
            amount:"R$ 12.000,00",
            category: {
            name: 'Vendas',
            icon: 'dollar'
            },
            date:"13/04/2022",
        },
        {
            id: '2',
            type: 'negative',
            title: "Hamburgueria Pizzy",
            amount:"R$ 59,00",
            category: {
            name: 'Alimentação',
            icon: 'coffee'
            },
            date:"10/04/2022",
        },
        {
            id: '3',
            type: 'negative',
            title: "Alugue do apartamento",
            amount:"R$ 1.200,00",
            category: {
            name: 'Casa',
            icon: 'home'
        },
            date:"10/04/2022",
    }
];

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={{uri:"https://avatars.githubusercontent.com/u/82901722?v=4" }}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Michael</UserName>
                        </User>
                    </UserInfo>
                
                 <LogoutButton>
                    <Icon name="power-off" />
                 </LogoutButton>
                </UserWrapper>
            </Header>

            <HightlightCards>
            <HightlightCard
             type='up' 
             title="Entradas"  
             amount="R$17.400,00" 
             lastTransaction='Última entrada dia 13 de abril'
            />

            <HightlightCard
             type='down' 
             title="Saídas"  
             amount="R$1.259,00" 
             lastTransaction='Última saída dia 03 de abril'
            />

            <HightlightCard
             type='total' 
             title="Total"  
             amount="R$16,141,00" 
             lastTransaction='01 à 16 de abril'
            />
            
            
            </HightlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item}  />}
                  
                />
            </Transactions>

        </Container>


    )
}




