import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator} from 'react-native'
import { HightlightCard } from '../../components/HightlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native'

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
    LogoutButton,
    LoadContainer

} from './styles'; // o estilo colocado com "View, Text..." dentro de styles para ficar mais pratico a manutenção

 export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HightlightData {
    entries: HighlightProps,
    expensives: HighlightProps;
    total: HighlightProps
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true); // para fazer a tela carrega
    const [ transactions, setTransactions] = useState<DataListProps[]>([]);
    const [hightlightData, setHightlightData] = useState<HightlightData>({} as HightlightData);

    const theme = useTheme();

    function getLastTransactionDate(collection: DataListProps[],
         type: 'positive' | 'negative'){

        
        const lastTransaction = new Date(
        (Math.max.apply(Math,
        collection.filter(transaction  => transaction.type === type)
        .map(transaction => new Date (transaction.date).getTime()))))    // logica para saber qual e a maior transação e a ultima data

        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`; // logica para colocar o dia e o mes
    }

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';             /* chave da coleção*/
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;       // para verificar entradas e saidas
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {    //  Tipagem do TransactionsFormatted e map serve para mapear(pecorer) toda a transação

                if(item.type === 'positive'){ // logica da soma de entradas
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);

                }

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


        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 à ${lastTransactionEntries}`;


        const total = entriesTotal - expensiveTotal;           

        setHightlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
               amount: expensiveTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            lastTransaction: `Última saída dia ${lastTransactionExpensives}`,

          },
          total: {
                amount: total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
          }),
          lastTransaction: totalInterval,

        }
        });
        setIsLoading(false); // para quando terminar de carrega ele cancelar o carregamento      

    }

    useEffect(() => {
        loadTransactions();

        /* const dataKey = '@gofinances:transactions';             
        const response = await AsyncStorage.getItem(dataKey);  Para limpar o cadastro */
    },[]);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[])); 


    return(
        <Container>
          
          {
              isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size="large"/></LoadContainer>: // logica para fazer o carregamento
          <>
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
             amount={hightlightData.entries.amount} 
             lastTransaction={hightlightData.entries.lastTransaction}
            />

            <HightlightCard
             type='down' 
             title="Saídas"  
             amount={hightlightData.expensives.amount} 
             lastTransaction={hightlightData.expensives.lastTransaction}
            />

            <HightlightCard
             type='total' 
             title="Total"  
             amount={hightlightData.total.amount} 
             lastTransaction={hightlightData.total.lastTransaction}
            />
            
            
            </HightlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item}  />}
                  
                />
            </Transactions>
          </>
        }
        </Container>
    )
}




