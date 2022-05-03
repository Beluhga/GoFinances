import styled from 'styled-components/native';
import { TouchableNativeFeedback} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(TouchableNativeFeedback)`
    height: ${RFValue(56)}px;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
`;
export const ImageContainer = styled.View`
    margin: 8px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: ${RFValue(16)}px;
    background-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;

`;
export const Text = styled.Text`
    flex:1;
    text-align: center;

    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;