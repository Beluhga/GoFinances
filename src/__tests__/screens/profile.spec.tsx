import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

// SUITE DE TESTES
describe('Grupo de Teste: Profile', () => {
// yarn add @types/jest -D
//Render nos Testes
it('"isto" deve ter um placeholder correto nesta tela', () => {
    const {getByPlaceholderText} = render(<Profile /> );

    // irar resgata o placeholder do Input Name com o nome: "Nome"
    const inputName = getByPlaceholderText('Nome')

    // espera verifca as propriedade do placeholder, se ele existe
    expect(inputName).toBeTruthy();

}); 

it('"isto" deve carregar Os dados do usuario, quando a interface abrir', () => {
    const { getByTestId} = render(<Profile />)

    const inputName = getByTestId('input-firstname')
    const inputLastName = getByTestId('input-lastname')

    // para saber se os valor são os 'Michael' e 'Albuquerque'
    expect(inputName.props.value).toEqual('Michael')
    expect(inputLastName.props.value).toEqual('Albuquerque')

});

it('deve existir um Title correto', () =>{
    const { getByTestId} = render(<Profile />)

    const TextTitle = getByTestId('title');
    // pega a propriedade filho(que esta dentro dele) para verificar
    expect(TextTitle.props.children).toContain('Perfil');

})

})



/*

-------------SELETORES--------------
test('verificar se input com placeholder correto está na tela', () => {
    const {getByPlaceholderText} = render(<Profile /> );

    // irar resgata o placeholder do Input Name com o nome: "Nome"
    const inputName = getByPlaceholderText('Nome')

    // espera verifca as propriedade do placeholder, se ele existe
    expect(inputName).toBeTruthy();

}); 

test('Os dados do usuario foi carregado, quando a interface abril', () => {
    const { getByTestId} = render(<Profile />)

    const inputName = getByTestId('input-firstname')
    const inputLastName = getByTestId('input-lastname')

    // para saber se os valor são os 'Michael' e 'Albuquerque'
    expect(inputName.props.value).toEqual('Michael')
    expect(inputLastName.props.value).toEqual('Albuquerque')

});

test('verificar se o title renderizou corretamente', () =>{
    const { getByTestId} = render(<Profile />)

    const TextTitle = getByTestId('title');
    // pega a propriedade filho(que esta dentro dele) para verificar
    expect(TextTitle.props.children).toContain('Perfil');

})

})

-------------------------------------------------
// yarn add @types/jest -D
//Render nos Testes
test('verificar se input com placeholder correto está na tela', () => {
    // para input especifico, o primeiro q encontra
    const {getByPlaceholderText} = render(<Profile /> )

    // espera verifca as propriedade do placeholder, se ele existe
    expect(inputName.props.placeholder).toBeTruthy();
--------------------------------------------------------
// yarn add @types/jest -D
//Render nos Testes
test('verificar se input com placeholder correto está na tela', () => {
    const {debug} = render(<Profile /> );

    debug();
}); 


*/