import React from 'react';
import { render} from '@testing-library/react-native';

import {Input} from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles.ts/theme';

const Providers: React.FC=({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);
// tESTES COM CONTEXTO
describe('Input Component', () => {
    it('deve ter uma cor de borda especifico quando o input estiver ativo', () =>{
        const { getByTestId } = render(
           <Input 
           // da pra trazer todas as propriedades (placeholder, value, onChange... )
            testID="input-email"
            placeholder="E-email"
            keyboardType='email-address'
            autoCorrect={false}
            active={true}
           />,
           {
            wrapper: Providers
           }
        );


        const inputComponent = getByTestId('input-email');
        //
        expect(inputComponent.props.style[0].borderColor)
        .toEqual('#e83f5b');

        expect(inputComponent.props.style[0].borderWidth)
        .toEqual(3);
    });
});