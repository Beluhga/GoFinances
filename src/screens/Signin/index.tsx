import React from "react";
import {Alert} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import LogoSvg from '../../assets/logo.svg';
import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

import {useAuth} from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import  GoogleSvg  from '../../assets/google.svg';
import  AppleSvg  from '../../assets/apple.svg';
import FacebookSvg from '../../assets/facebook.svg';


export function SignIn(){
    const {signInWithGoogle} = useAuth();

    async function handleSignInWithGoogle(){
        try {
            await signInWithGoogle();

        } catch (error){
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
        }
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                     width={RFValue(120)}
                     height={RFValue(68)}
                     />
                     <Title>Controle suas {`\n`}
                         dinanças de forma {`\n`} 
                         muito simples</Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {`\n`}
                    uma das contas abaixo
                </SignInTitle>

            </Header>

            <Footer>
                <FooterWrapper>

                    <SignInSocialButton 
                     title= "Entrar com Apple"
                     svg= {AppleSvg}
                    />

                    <SignInSocialButton 
                     title= "Entrar com Facebook"
                     svg= {FacebookSvg}
                    />

                    <SignInSocialButton 
                     title= "Entrar com Google"
                     svg= {GoogleSvg}
                     onPress= {handleSignInWithGoogle}

                    />
                    
                </FooterWrapper>

            </Footer>

        </Container>

    )
}