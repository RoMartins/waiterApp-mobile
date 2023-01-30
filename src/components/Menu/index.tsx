import { FlatList } from 'react-native';
import { Text } from '../Text';
import {Image, ProductContainer, ProductDetails, Separator, AddToCartButton} from './styles';
import { formatCurrency } from '../../utils/formatCurrent';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { Product } from '../../types/Product';


interface MenuProps {
	OnAddToCart : (product: Product) => void;
	products : Product[];
}
export function Menu({OnAddToCart, products}: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product : Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        OnAddToCart={OnAddToCart}
      />
      <FlatList
        data={products}
        style={{marginTop: 32}}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{paddingHorizontal: 24}}
        keyExtractor={product => product._id}
        renderItem={({item : product}) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <Image
					 source={{
                uri:`http://192.168.15.38:3001/uploads/${product.imagePath}`
					 }}
            />
            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text color='#666' size={14}>{product.description}</Text>
              <Text size={14} weight='600' style={{lineHeight: 36}} >{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => OnAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>


  );
}
