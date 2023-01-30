import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Container, CategoriesContainer,Footer,MenuContainer, CenteredContainer } from './styles';
import {products  as mockProducts} from '../mocks/products';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import axios from 'axios';


export function Main() {

  const [isTableModalVisible, setIsTableModalVisible ] = useState(false);
  const [selectedNumberTable, setSelectedNumberTable ] = useState('');
  const [cartItems, setCartItems ] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
	 axios.get('http://192.168.15.38:3001/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://192.168.15.38:3001/products').then((response) => {
			 setProducts(response.data);
		 });
	 }, []);
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
				 <Categories categories={categories} />
			 </CategoriesContainer>

			 {products.length > 0 ? (
              <MenuContainer>
                <Menu OnAddToCart={handleAddToCart} products={products}/>
              </MenuContainer>
			 ) : (
              <CenteredContainer>
                <Empty />
                <Text color='#666'>
									Nenhum produto foi encontrado!
                </Text>
              </CenteredContainer>
			 )}
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


