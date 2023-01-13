import { useState } from 'react';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Overlay, ModalBody, Form, Header, Input } from './styles';

interface TableModalProps {
	visible : boolean;
	onClose : () => void;
	onSave: (table:string) => void;
}


export function TableModal({visible, onClose, onSave} : TableModalProps) {
  const [numberTable, setNumberTable] = useState('');

  function handleSave() {
    setNumberTable('');
    onSave(numberTable);
    onClose();
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666'/>
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={setNumberTable}
            />
            <Button onPress={handleSave} disabled={numberTable.length === 0}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>


    </Modal>
  );
}
