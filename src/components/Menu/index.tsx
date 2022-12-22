import { FlatList, TouchableOpacity } from 'react-native';
import {products} from '../../mocks/products';
import { Text } from '../Text';
import {Image, Product, ProductDetails, Separator} from './styles';
import { formatCurrency } from '../../utils/formatCurrent';
import { PlusCircle } from '../Icons/PlusCircle';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{marginTop: 32}}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{paddingHorizontal: 24}}
      keyExtractor={product => product._id}
      renderItem={({item : product}) => (
        <Product>
          <Image
					 source={{
              uri:`http://192.168.15.83:3001/uploads/${product.imagePath}`
					 }}
          />
          <ProductDetails>
            <Text weight='600'>{product.name}</Text>
            <Text color='#666' size={14}>{product.description}</Text>
            <Text size={14} weight='600' style={{lineHeight: 36}} >{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <TouchableOpacity>
            <PlusCircle />
          </TouchableOpacity>
        </Product>
      )}
    />


  );
}
