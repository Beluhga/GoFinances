import React, { useEffect, useState, useCallback } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import {useTheme} from 'styled-components';

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthPrevious,
    MonthSelectIcon,
    Month,
    LoadContainer,
} from './styles';
import { categories } from '../../components/utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

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
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;

}

 export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev'){ // logica para mudar o mes do grafico
        if(action === 'next'){
           setSelectedDate(addMonths(selectedDate, 1));
        }else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData(){
        setIsLoading(true);
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
         .filter((expensive: TransactionData) => 
         expensive.type === 'negative' && new Date(expensive.date).getMonth() === selectedDate.getMonth()
         && new Date(expensive.date).getFullYear() === selectedDate.getFullYear()); /* para cada expensive o type e igual a negativo (expensive foi tipado) */

         const expensivesTotal =  expensives.reduce((acumullator: number, expensive: TransactionData) => { /* logica do grafico */
            return acumullator + Number(expensive.amount); /* ficou envolvido por parenteses "()" pq ele e uma string e teve q ser alterado */

         }, 0); // valor inicial 0


         const totalByCategory: CategoryData[] = [];

         categories.forEach(category =>{            /*logica para pecorre cada categoria, ira percorre todos os gastos para ver se e a mesma da chave*/
             let categorySum = 0;

             expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                categorySum += Number(expensive.amount);
                }   
             });

             if(categorySum > 0) {
                
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`; /* porcentagem do grafico*/

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent

             });
            }
         });

         setTotalByCategories(totalByCategory);
         setIsLoading(false);
    }


    useFocusEffect(useCallback(() => {
        loadData();
    },[selectedDate])); 

    return(
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            {
            isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size="large"/></LoadContainer>: // logica para fazer o carregamento
            <>
            <Content
             showsVerticalScrollIndicator= {false}
             contentContainerStyle={{
                 paddingHorizontal: 24,
                 paddingBottom: useBottomTabBarHeight(),
 
             }}
            >
            
            <MonthSelect>
                    <MonthPrevious onPress={() => handleDateChange('prev')}>
                    <TouchableWithoutFeedback onPress={() => handleDateChange('prev')}>

                    <MonthSelectIcon name="chevron-left"/>
                    </TouchableWithoutFeedback>
                </MonthPrevious>
                
                


             <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

             
             <MonthPrevious onPress={() => handleDateChange('next')}>
             <TouchableWithoutFeedback onPress={() => handleDateChange('next')}>
                    <MonthSelectIcon name="chevron-right"/>
            </TouchableWithoutFeedback>
             </MonthPrevious>
             
 
            </MonthSelect>
            
            <ChartContainer>

            <VictoryPie /* esse aqui é o grafico*/
             data={totalByCategories}
             colorScale={totalByCategories.map(category => category.color)}
             style={{
                 labels: { 
                     fontSize: RFValue(15),
                     fontWeight: 'bold',
                     fill: theme.colors.shape
                    }
                 
             }}
             labelRadius={50}
             x="percent"
             y="total"
            
            />
            </ChartContainer>
        
            {
                totalByCategories.map(item => (
                <HistoryCard 
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color= {item.color}
                />
                ))
        }
         </Content>
         </>
        
        }
        </Container>
    )
}