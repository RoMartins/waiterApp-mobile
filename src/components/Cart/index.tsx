import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrent';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  Actions,
  ItemContainer,
  ProductCartContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from './styles';


interface CartProps {
	cartItems: CartItem[];
	onAdd: (product : Product) => void;
	onDecrememt: (product : Product) => void;
}


export function Cart({cartItems, onAdd,onDecrememt}: CartProps) {

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

	 return(
    <>
      {cartItems.length > 0 &&
		 	 <FlatList
		 	   data={cartItems}
		 	   keyExtractor={cartItem => cartItem.product._id}
		 	   showsVerticalScrollIndicator={false}
		 	   style={{marginBottom:20, maxHeight: 150}}
		 	   renderItem={({item: cartItem}) => (
		 	     <ItemContainer>
		 	       <ProductCartContainer>
		 	         <Image
		 	           source={{
		 	             uri:`http://192.168.15.83:3001/uploads/${cartItem.product.imagePath}`,
							 }}
		 	         />

		 	         <QuantityContainer>
            	<Text size={14} color="#666">
		 	             {cartItem.quantity}x
		 	           </Text>
		 	         </QuantityContainer>

		 	         <ProductDetails>
		 	           <Text size={14} weight="600">{cartItem.product.name}</Text>
		 	           <Text size={14} color="#666" style={{marginTop:4}} >
		 	             {formatCurrency(cartItem.product.price)}
		 	           </Text>
		 	         </ProductDetails>
		 	       </ProductCartContainer>

		 	       <Actions>
							 <TouchableOpacity style={{marginRight: 22}} onPress={() => onAdd(cartItem.product)}>
              		<PlusCircle />
							 </TouchableOpacity>

							 <TouchableOpacity onPress={() => onDecrememt(cartItem.product)}>
							 		<MinusCircle />
							 </TouchableOpacity>
		 	       </Actions>
		 	     </ItemContainer>
		 	   )}
		 	 />
		 }

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
				 <Text color='#666'>Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
				 ): (
            <Text>Seu carrinho está vazio</Text>
          )
          }
        </TotalContainer>

        <Button onPress={() => alert('Confirmar pedido')} disabled={cartItems.length === 0}>
						Confirmar Pedido
        </Button>
      </Summary>

    </>
	 );
}
