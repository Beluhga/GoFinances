import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import {Input} from '../Input';

import {
    Container
} from './styles';

interface Props extends TextInputProps {
    control: Control;
    name: string;
}

export function InputForm({
    control,
    name,
    ...rest
}: Props){
    return(
        <Container>
          <Controller // e pra controlar o input, para nao ter todas as modificações a todo momento q o Input muda
            control={control} // O formulario q esta controlando ele
            render={({ field: {onChange, value}}) => (   /* onChange= ´E quando muda o conteudo, value= valor dele */
                <Input
                 onChangeText={onChange}
                 value={value}
                 {...rest}
            /> // o Input q vai renderizar e ser controlado
            )}
              name={name}
            />

        </Container>
    )
}