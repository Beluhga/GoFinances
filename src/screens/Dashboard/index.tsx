import React, { useEffect, useState } from 'react';
import { HightlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import AsyncStorage from '@react-native-async-storage/async-storage'



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
    const [ data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';             /* chave da coleção*/
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {    //  Tipagem do TransactionsFormatted e map serve para mapear(pecorer) toda a transação
                const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR',{ // 'Intl' e do JS serve para formata os numeros de data
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }) .format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount: amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
        }); 

            setData(transactionsFormatted);
            console.log(transactionsFormatted)

    }

    useEffect(() => {

        loadTransactions();

    },[]);

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




