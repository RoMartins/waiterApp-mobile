import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Container, CategoriesContainer,Footer,MenuContainer } from './styles';


export function Main() {

  const [isTableModalVisible, setIsTableModalVisible ] = useState(false);
  const [isSaveNumberTable, setIsSaveNumberTable ] = useState('12');

  function handleSaveTable(table: string) {
    setIsSaveNumberTable(table);
  }

  function handleCancelOrder() {
    setIsSaveNumberTable('');
  }
  return (
    <>
      <Container>
        <Header
          NumberTable= {isSaveNumberTable}
          onCancelOrder= {handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>


      </Container>

      <Footer>
        {!isSaveNumberTable && (
          <Button onPress={() => setIsTableModalVisible(true)}>
					Novo pedido
          </Button>
        )}
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />

    </>

  );
}


