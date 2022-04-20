import React from 'react';
import {TouchableOpacityProps} from 'react-native'

import{ Container, Title} from './styled';

interface Props extends TouchableOpacityProps{ /* feito para tipar */
    title: string;

}

export function Button({title, ...rest}: Props){
    return(
        <Container {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}