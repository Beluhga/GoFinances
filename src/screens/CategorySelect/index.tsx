import React from 'react';
import { categories } from '../../components/utils/categories';
import { FlatList } from 'react-native';


import { Button } from '../../components/Form/Button';

import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    
} from './styles';

interface Category{
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory:(category: Category) => void; // pq nao retorna anda, se coloca void
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props){
    function handleCategorySelect( category: Category){ // logica para q quando clicar ele passa o item para dentro do Category
        setCategory(category); // para atualizar o estado da função
    }


    return(
        <Container>
            <Header>
                <Title>Categoria</Title>

            </Header>

            <FlatList 
                data={categories}
                style={{flex: 1, width: '100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                   
                    <Category
                        onPress={() => handleCategorySelect(item)} // categoria selecionada pelo usuario
                        isActive={category.key === item.key} // para exibir e a key é para compara
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />} /* para fazer as linhas de separação*/
            />

            <Footer>
                <Button 
                title="Selecionar" 
                onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}
