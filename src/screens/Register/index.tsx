import React, {useState} from 'react';

import {Input} from '../../components/Form/Input';
import {Button} from '../../components/Form/Button';
import {CategorySelect} from '../../components/Form/CategorySelect';
import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton';

import{
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionsTypeSelect(type : 'up' | 'down'){ /*  Logica pra quando for clicado o botão pra ficar verde ou vermelho*/
        setTransactionType(type); 
    }
    

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
            <Input 
                placeholder='Nome'
            />

            <Input 
                placeholder='Preço'
            />

            <TransactionsTypes>
            <TransactionTypeButton 
                type= "up"
                title= "Income"
                onPress= {() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'} //Caso estiver ativo //
            />

            <TransactionTypeButton 
                type= "down"
                title= "Outcome"
                onPress= {() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'} //Caso estiver ativo //
            />
            </TransactionsTypes>

            <CategorySelect title="Categoria" />
            </Fields>

            <Button title="Enviar" />

            </Form>
        </Container>

    )
}





