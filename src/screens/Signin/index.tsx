import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
    Container,
    Header,
    TitleWrapper,
    LogoSvg,
    Title,
    SignInTitle,
    Footer
} from './styles'


export function SignIn(){
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                     width={RFValue(200)}
                     height={RFValue(200)}
                     />
                     <Title>Controle suas dinanças de forma muito simples</Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>

            </Header>

            <Footer>

            </Footer>

        </Container>

    )
}