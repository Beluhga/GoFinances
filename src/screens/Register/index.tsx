import React, {useState, useEffect} from 'react';
import { 
    Alert,
    Keyboard,
    Modal, 
    TouchableWithoutFeedback 
    } from 'react-native'; //// Modal utilizado para abrir e fechar

import * as Yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup';

import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

import { 
    useNavigation, 
    NavigationProp, 
    ParamListBase
} from '@react-navigation/native';
import { useForm} from 'react-hook-form';

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

interface FormData {                  // foram tipados la nos InputForm
    name: string;
    amount: string;
}



const schema = Yup.object().shape({   // alidados de formularios
    name: Yup.string().required('Nome é obrigatorio'),                        // o formulario so vai ser valido ser uma string // o formulario so vai ser valido ser obrigatorio
    amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatorio')
     /* o formulario so vai ser valido ser numero obrigatorio
      o formulario so vai ser valido ser for numero
      o formulario so vai ser valido ser pq so pode valor positivo
      o formulario so vai ser valido ser é obrigatorio coloca um numero*/
});  

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const dataKey = '@gofinances:transactions'; /* chave da coleção*/


    const [category, setCategory] = useState({ /* para mostras as categorias da lista */
        key: 'category',
        name: 'Categoria'
    });

    const {navigate}: NavigationProp<ParamListBase> = useNavigation();



    const {
        control,                    // registra os inputs do formulario
        handleSubmit,               // pega todos os valores de todos os inputs do formulario e envia uma unica vez
        reset,                      // para resetar
        formState: { errors}        // para captura os erros
    } = useForm({
        resolver: yupResolver(schema) // para força q o envio de valores, siga um padrao
    });

    function handleTransactionsTypeSelect(type : 'up' | 'down'){ /*  Logica pra quando for clicado o botão pra ficar verde ou vermelho*/
    setTransactionType(type); 

    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)  // logica para saber se as categorias estão abertas ou fechadas
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false) // para fechar o Modal
    }

     async function handleRegister(form: FormData){
        if(!transactionType)        // ativa se nao tiver nada em transactionType
            return Alert.alert('Selecione o tipo da transação');

        if(category.key === 'category') // se a não escolheu uma categoria
            return Alert.alert('Selecione a categoria');


        const newTransaction={
        id: String(uuid.v4()),      // para salvar como uma string
        name: form.name,
        amount: form.amount,
        transactionType,
        category: category.key,
        date: new Date()
        }

        try {  

            /*estrutura para tratar o erro (try - tentar) - (catch - é para ver oq q tem de errado) */
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,         /* despeja todos os dados salvo*/
                newTransaction           /* para ficar juntos com as novas transações*/
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); // passa a chave pro AsyncStorage pelo setItem, dai o objeto (data) foi passado por texto com o JSON.stringify para armazena-lo

            reset();   // para resetar o local de "Nome"
            setTransactionType('');    
            setCategory({          
                key: 'category',
                name: 'Categoria' 
            });
            
            navigate('Listagem');        // esta em routes ( é uma rota)

        }   catch (error){
            console.log(error);
            Alert.alert("Não foi possível salvar")
    }}

    useEffect(() => {
        async function loadData(){

        const data = await AsyncStorage.getItem(dataKey);
        console.log(JSON.parse(data!));
    }
        loadData();

        /*async function removeAll() {
            await AsyncStorage.removeItem(dataKey);
        }

        removeAll();*/

    },[]);

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
                onPress={handleSubmit(handleRegister)} /*para enviar a mensagem*/
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





