import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import{ Container, Title} from './styled';
import { TouchableWithoutFeedback } from 'react-native';

interface Props extends RectButtonProps{ /* feito para tipar */
    title: string;
    onPress: () => void;

}

export function Button({
    title,
    onPress,
    ...rest}: Props){
    return(
        <TouchableWithoutFeedback
            onPress={onPress}
        >
        <Container  {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
        </TouchableWithoutFeedback>
    )
}