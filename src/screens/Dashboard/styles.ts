import styled from 'styled-components/native'; // para poder import o styled-components
import { FlatList } from 'react-native';
import{ RFPercentage, RFValue } from 'react-native-responsive-fontsize'; // para deixar responsivo com todas as plataformas
import { FontAwesome } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler'

import { DataListProps } from '.';


//aqui é pra exporta todos os components. usar a crase (``) entre eles, usasse do mesmo modo q o CSS as propriedades.
export const Container = styled.View` 
    flex: 1;
    background-color: ${({theme}) => theme.colors.background}; // desconstruindo para poder ser utilizado os themes que o "styled.d.ts" estendeu
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;

    background-color: ${({theme}) => theme.colors.primary}; // No caso theme e o tipo, tipo(theme), propriedade(colors), valor(title)//
`;

export const UserWrapper= styled.View`
    width: 100%;
    padding: 0px 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px; /* getSatatusBarHeight é pra ser usado para o Iphone*/
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo =styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo =styled.Image`
    width:${RFValue(50)}px;
    height:${RFValue(50)}px;
    border-radius: 10px;

`;

export const User =styled.View`
    margin-left: 17px;
`;

export const UserGreeting =styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName =styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
`;
export const LogoutButton= styled( BorderlessButton )``;

export const Icon = styled( FontAwesome )` /* forma pra usar um Icones */
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

export const HightlightCards = styled.ScrollView.attrs({ /* o attrs({}) é para acessar as propriedades dentro do ScrollView */
    horizontal: true,
    showsHorizontalScrollIndicator: false, /* para nao ver a barra */
    contentContainerStyle: { paddingHorizontal: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};

    margin-bottom: 16px;

`;
export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps> /* uma tipagem personalizada para o FlatList */
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle:{
    paddingBottom: getBottomSpace() 
    }
})``;

export const LoadContainer =styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;