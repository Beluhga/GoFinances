import React, {useState} from 'react';
import { Modal } from 'react-native'; //// utilizado para abrir e fechar

import {Input} from '../../components/Form/Input';
import {Button} from '../../components/Form/Button';
import {CategorySelectButton} from '../../components/Form/CategorySelectButton';
import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

        const [category, setCategory] = useState({ /* para mostras as categorias da lista */
            key: 'category',
            name: 'Categoria'
        });

        function handleTransactionsTypeSelect(type : 'up' | 'down'){ /*  Logica pra quando for clicado o botão pra ficar verde ou vermelho*/
        setTransactionType(type); 

    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true) // logica para saber se as categorias estão abertas ou fechadas
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false) // para fechar o Modal
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

            <CategorySelectButton 
                title={category.name} // para aparecer o nome da categoria selecionada
                onPress={handleOpenSelectCategoryModal} // p modal chama essa OpenSelect
            />
            </Fields>

            <Button title="Enviar" />

            </Form>

            <Modal visible={categoryModalOpen}> 
                <CategorySelect
                        category= {category} // o estado atual
                        setCategory= {setCategory} // para mudar o estado
                        closeSelectCategory= {handleCloseSelectCategoryModal} // para fechar a Modal
            
                />
            </Modal>
        </Container>

    )
}





