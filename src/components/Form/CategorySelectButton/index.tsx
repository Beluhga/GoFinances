import React from 'react';
import { TouchableWithoutFeedback  } from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler'
import {
    Container,
    Category,
    Icon,
} from './styles'

interface Props extends RectButtonProps{
    title: string;
    onPress: () => void; // para abrir e fecha a lista de CategorySelect
}

export function CategorySelectButton({
    title,
    onPress,
    testID
}: Props){
    return(
        <TouchableWithoutFeedback 
        onPress={onPress}
        >

        <Container testID = {testID}>
            <Category>{title}</Category>
            <Icon name="chevron-down" />
        </Container>
        </TouchableWithoutFeedback>

    )
}