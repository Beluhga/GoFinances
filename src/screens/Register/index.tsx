import React, {useState} from 'react';
import { Modal } from 'react-native'; //// utilizado para abrir e fechar
import { useForm} from 'react-hook-form';

import {Input} from '../../components/Form/Input';
import {InputForm} from '../../components/Form/InputForm';

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

interface FormData { // foram tipados la nos InputForm
    name: string;
    amount: string;
}

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({ /* para mostras as categorias da lista */
        key: 'category',
        name: 'Categoria'
    });

    const {
        control, // registra os inputs do formulario
        handleSubmit // pega todos os valores de todos os inputs do formulario e envia uma unica vez
    } = useForm();

    function handleTransactionsTypeSelect(type : 'up' | 'down'){ /*  Logica pra quando for clicado o botão pra ficar verde ou vermelho*/
    setTransactionType(type); 

    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true) // logica para saber se as categorias estão abertas ou fechadas
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false) // para fechar o Modal
    }

    function handleRegister(form: FormData){
        const data={
        name: form.name,
        amount: form.amount,
        transactionType,
        category: category.key
        }

        console.log(data);

    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
            <InputForm 
                name="name"
                control={control}
                placeholder='Nome'
            />

            <InputForm 
                name="amount"
                control={control}
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

            <Button 
                title="Enviar" 
                onPress={handleSubmit(handleRegister)} //para enviar a mensagem
            />

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





