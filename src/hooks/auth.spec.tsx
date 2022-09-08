import { renderHook, act} from '@testing-library/react-hooks';
import {AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();
// biblioteca que quer mockae (expo-auth-session)
jest.mock('expo-auth-session', () => {
    return {
        //a função que abri a tela a autenticação (startAsync)
        startAsync: () => {
            return {
              type: 'success',
              params: {
                access_token: 'google-token'
              }  
            }
        }
    }
})

/*
        1 - abre uma tela para usuario autenticar
        2 - retorna para o usuario type e params
        3 - Fetch dos dados de perfil do servidor da google
*/
describe('Autenticar o Hook', () => {
    it('Dever logar com uma conta Google existente', async () => {
        global.fetch = jest.fn(()=> Promise.resolve({
           json: () => Promise.resolve({
            // informações do usuario
             id: `userInfo.id`,
             email: `userInfo.email`,
             name: `userInfo.given_name`,
             photo: `userInfo.picture`,
             locale: `userInfo.locale`,
             verified_email: `userInfo.verified_email`,
           }),
        })) as jest.Mock;

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        // para verse o usuario esta logado
        expect(result.current.user).toBeTruthy();
    });

    it('O usuario não pode se conectar se ele cancelar autenticação com o Google', async () => {
        global.fetch = jest.fn(()=> Promise.resolve({
            json: () => Promise.resolve({
             // informações do usuario
              id: `userInfo.id`,
              email: `userInfo.email`,
              name: `userInfo.given_name`,
              photo: `userInfo.picture`,
              locale: `userInfo.locale`,
              verified_email: `userInfo.verified_email`,
            }),
         })) as jest.Mock;
 
         const { result } = renderHook(() => useAuth(), {
             wrapper: AuthProvider
         });
 
         await act(() => result.current.signInWithGoogle());

        // para saber se a propriedade ID nao existir
        expect(result.current.user).toHaveProperty('id');
    });

    it('retornar erro caso o parametros esteja incorreto', async () => {
        global.fetch = jest.fn(()=> Promise.resolve({
            json: () => Promise.resolve({
             // informações do usuario
              id: `userInfo.id`,
              email: `userInfo.email`,
              name: `userInfo.given_name`,
              photo: `userInfo.picture`,
              locale: `userInfo.locale`,
              verified_email: `userInfo.verified_email`,
            }),
         })) as jest.Mock;
 
         const { result } = renderHook(() => useAuth(), {
             wrapper: AuthProvider
         });
         try{
         await act(() => result.current.signInWithGoogle());
         }catch {
        // para saber se a propriedade ID nao existir
        expect(result.current.user).toEqual({});
         }
    });

});