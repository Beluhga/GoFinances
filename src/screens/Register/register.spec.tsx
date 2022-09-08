import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import {Register} from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles.ts/theme';


const Providers: React.FC=({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe('Tela de Registro', () => {
    it('Abrir a modal quando clicar no botão de categoria', () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );
        const categoryModal = getByTestId("modal-category");
        const buttonCategory = getByTestId("button-category");
        // para dispara eventos dentro dos teste na interface
        // quando o usuario clicar no botão, ele vai executar a função e atualiza o estado pra true
        fireEvent.press(buttonCategory);

        // Função para lidar com coisas assincronas
        waitFor(() => {
            // quando o evento for verdadeiro
            expect(categoryModal.props.visible).toBeTruthy();
        })
    })
});

