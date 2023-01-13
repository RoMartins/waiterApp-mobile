import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader,Table } from './styles';


interface HeaderProps {
	NumberTable : string;
	onCancelOrder: () => void;
}
export function Header({NumberTable, onCancelOrder}: HeaderProps) {
  return (
    <Container>
      {!NumberTable && (
        <>
		   <Text size={14} opacity={0.9}> Bem vindo(a) ao </Text>
          <Text size={24} weight="700"> WAITER
            <Text size={24}>APP </Text>
          </Text>

        </>
	 )}

	 {NumberTable && (
        <Content>
          <OrderHeader>

            <Text size={24} weight="600">Pedido</Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} color="#d73035" weight="600">cancelar pedido</Text>
            </TouchableOpacity>

          </OrderHeader>

          <Table>
            <Text color="#666">Mesa {NumberTable}</Text>
          </Table>

        </Content>
	 )}
    </Container>

  );
}
