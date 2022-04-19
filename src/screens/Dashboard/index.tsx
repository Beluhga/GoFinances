import React from 'react';
import { HightlightCard } from '../../components/HightlightCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HightlightCards

} from './styles'; // o estilo colocado com "View, Text..." dentro de styles para ficar mais pratico a manutenção

export function Dashboard(){
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={{uri:"https://avatars.githubusercontent.com/u/82901722?v=4" }}/>
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Michael</UserName>
                        </User>
                    </UserInfo>
                    
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightlightCards
                horizontal
                showsHorizontalScrollIndicator={false} /* para nao ver a barra */
                contentContainerStyle={{ paddingHorizontal: 24}}
            >
            <HightlightCard />
            <HightlightCard />
            <HightlightCard />
            </HightlightCards>

        </Container>

    )
}


