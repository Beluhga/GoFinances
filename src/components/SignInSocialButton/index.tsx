import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
    Button,
    ImageContainer,
    Text,
} from './styles';

import { TouchableNativeFeedbackProps} from 'react-native';

interface Props extends TouchableNativeFeedbackProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props){
    return (
             
        <Button  {...rest} >
        
            <ImageContainer >
            <Svg />
            <Text>{title}</Text>
            </ImageContainer>
            
            
        </Button>
        

        

        
        
        
    )
}