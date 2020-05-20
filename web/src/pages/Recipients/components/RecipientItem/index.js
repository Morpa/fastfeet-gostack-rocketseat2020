import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Alert from '~/components/Alerts/Delete';
import MenuActions from '~/components/MenuActions';
import { ButtonEdit } from '~/components/Shared/Buttons';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MenuActionsContainer } from './styles';

export default function RecipientItem({ data, updateRecipients }) {
  async function handleDelete() {
    Alert.delete().then(result => {
      if (result.value) {
        try {
          api.delete(`/recipient/${data.id}`);
          updateRecipients();
          toast.success('Destinatário apagado com sucesso!');
          history.push('/recipients');
        } catch (err) {
          toast.error(
            'Esse destinatário não pode ser apagado, pois ainda tem encomenda para receber!'
          );
        }
      }
    });
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>
        {data.street}, {data.number}, {data.city} - {data.state}
      </small>
      <MenuActions>
        <MenuActionsContainer>
          <ButtonEdit
            color={colors.info}
            url={`edit/${data.id}`}
            Icon={MdEdit}
            title="Editar"
          />
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MenuActionsContainer>
      </MenuActions>
    </Container>
  );
}

RecipientItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
