import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native'


export function Profile(){
return (
    <View>
    <Text testID="title">
        Perfil
    </Text>
    
    <TextInput
        testID="input-firstname"
        placeholder='Nome'
        autoCorrect={false}
        value="Michael"
    />
     <TextInput
        testID="input-lastname"
        placeholder='Sobrenome'
        value="Albuquerque"
    />

    <Button 
        title="Salvar"
        onPress={() => {}}
    />
    </View>

  );
}

/*

----------- toEqual------------------
    <TextInput
        testID="input-firstname"
        placeholder='Nome'
        autoCorrect={false}
        value="Michael"
    />
     <TextInput
        testID="input-lastname"
        placeholder='Sobrenome'
        value="Albuquerque"
    />

    <Button 
        title="Salvar"
        onPress={() => {}}
    />
    </View>

  );
}


*/