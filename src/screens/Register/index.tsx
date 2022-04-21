import React, {useState} from 'react';
import { 
    Alert,
    Keyboard,
    Modal, 
    TouchableWithoutFeedback 
    } from 'react-native'; //// Modal utilizado para abrir e fechar

import * as Yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup'


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

const schema = Yup.object().shape({ // alidados de formularios
    name: Yup
    .string() // o formulario so vai ser valido ser uma string
    .required('Nome é obrigatorio'), // o formulario so vai ser valido ser obrigatorio
    amount: Yup
    .number() // o formulario so vai ser valido ser numero obrigatorio
    .typeError('Informe um valor númerico') // o formulario so vai ser valido ser for numero
    .positive('O valor não pode ser negativo') // o formulario so vai ser valido ser pq so pode valor positivo
    .required('O valor é obrigatorio') // o formulario so vai ser valido ser é obrigatorio coloca um numero
});  

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({ /* para mostras as categorias da lista */
        key: 'category',
        name: 'Categoria'
    });

    const {
        control, // registra os inputs do formulario
        handleSubmit, // pega todos os valores de todos os inputs do formulario e envia uma unica vez
        formState: { errors} // para captura os erros
    } = useForm({
        resolver: yupResolver(schema) // para força q o envio de valores, siga um padrao
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

    function handleRegister(form: FormData){
        if(!transactionType) // ativa se nao tiver nada em transactionType
            return Alert.alert('Selecione o tipo da transação');

        if(category.key === 'category') // se a não escolheu uma categoria
            return Alert.alert('Selecione a categoria');


        const data={
        name: form.name,
        amount: form.amount,
        transactionType,
        category: category.key
        }

        console.log(data);

    }

    return(
        //Para fechar o teclado quando clicar em qualquer outra parte //
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
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
                autoCapitalize="sentences" // para ter a primeira letra maiuscula
                autoCorrect={false} // para nao corrigir
                error={errors.name && errors.name.message} // se der erro vai aparecer a mesagem de validação
            />

            <InputForm 
                name="amount"
                control={control}
                placeholder='Preço'
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
    )
}





