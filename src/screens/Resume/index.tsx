import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    Container,
    Header,
    Title,
    Content,
} from './styles';
import { categories } from '../../components/utils/categories';

interface TransactionData{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: String;
    date: string;
}

interface CategoryData{
    key: string;
    name: string;
    total: string;
    color: string;

}

 export function Resume(){
     const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]); 

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
         .filter((expensive: TransactionData) => expensive.type === 'negative'); // para cada expensive o type e igual a negativo (expensive foi tipado)

         const totalByCategory: CategoryData[] = [];

         categories.forEach(category =>{            //logica para pecorre cada categoria, ira percorre todos os gastos para ver se e a mesma da chave
             let categorySum = 0;

             expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                categorySum += Number(expensive.amount);
                }   
             });

             if(categorySum > 0) {
                
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    
                })

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total,

             });
            }
         });

         setTotalByCategories(totalByCategory);
    }

    useEffect(() =>{
        loadData();
    },[]);

    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

         <Content >
            {
                totalByCategories.map(item => (
                <HistoryCard 
                    key={item.key}
                    title={item.name}
                    amount={item.total}
                    color= {item.color}
                />
                ))
        }
         </Content>
        </Container>
    )
}