import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmProps {
	visible: boolean;
	onOk: () => void
 }

export function OrderConfirmedModal({visible, onOk}: OrderConfirmProps) {
  return (
    <>
      <Modal
        animationType="fade"
        visible={visible}
      >
        <Container>
          <CheckCircle />
          <Text size={20} weight="600" color='#fff' style={{marginTop:12}}>
						Pedido Confirmado
          </Text>

          <Text opacity={0.9} color='#fff' style={{marginTop:4}}>
						O pedido já entrou na fila de produção
          </Text>

          <OkButton onPress={onOk}>
            <Text weight='600' color='#d73035' >OK</Text>
          </OkButton>
        </Container>
      </Modal>
    </>
  );
}
