import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Alert from '~/components/Alerts/Cancel';
import MenuActions from '~/components/MenuActions';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, MenuActionsContainer, ModalContainer } from './styles';

export default function ProblemItem({ data, updateProblems }) {
  async function handleCancel() {
    Alert.delete().then(result => {
      if (result.value) {
        try {
          api.update(`/delivery/${data.id}/problems`);
          updateProblems();
          toast.success('Encomenda cancelada com sucesso!');
        } catch (err) {
          toast.error('Essa encomenda não pode ser cancelada!');
        }
      }
    });
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.description}</small>
      <MenuActions
        contentStyle={{
          width: '200px',
          borderRadius: '4px',
        }}
      >
        <MenuActionsContainer>
          <div>
            <Modal>
              <ModalContainer>
                <strong>Visuzalizar Problema</strong>
                <p>{data.description}</p>
              </ModalContainer>
            </Modal>
          </div>
          <div>
            <button onClick={handleCancel} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Cancelar encomenda</span>
            </button>
          </div>
        </MenuActionsContainer>
      </MenuActions>
    </Container>
  );
}

ProblemItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateProblems: PropTypes.func.isRequired,
};
