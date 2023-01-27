import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Container, CategoriesContainer,Footer,MenuContainer, CenteredContainer } from './styles';


export function Main() {

  const [isTableModalVisible, setIsTableModalVisible ] = useState(false);
  const [selectedNumberTable, setSelectedNumberTable ] = useState('');
  const [cartItems, setCartItems ] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);


  function handleSaveTable(table: string) {
    setSelectedNumberTable(table);
  }

  function handleResetOrder() {
    setSelectedNumberTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if(!selectedNumberTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      if(itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity +1
      };

      return newCartItems;

    });
  }

  function handleDecrementToCart(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;

    });


  }

  return (
    <>
      <Container>
        <Header
          NumberTable= {selectedNumberTable}
          onCancelOrder= {handleResetOrder}
        />

        {!isLoading ? (
          <>
				 <CategoriesContainer>
				 <Categories />
			 </CategoriesContainer>

			 <MenuContainer>
				 <Menu OnAddToCart={handleAddToCart}/>
			 </MenuContainer>
          </>

			 ) : (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large"/>
          </CenteredContainer>
			 )}

      </Container>

      <Footer>
        {!selectedNumberTable && (
          <Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
					Novo pedido
          </Button>
        )}

        {selectedNumberTable && (
          <Cart
            onAdd={handleAddToCart}
            cartItems={cartItems}
            onDecrememt={handleDecrementToCart}
            onConfirmOrder = {handleResetOrder}
          />
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


