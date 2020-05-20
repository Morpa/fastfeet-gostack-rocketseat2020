import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Alert from '~/components/Alerts/Delete';
import MenuActions from '~/components/MenuActions';
import { ButtonEdit } from '~/components/Shared/Buttons';
import api from '~/services/api';
import history from '~/services/history';
import { statusColors, colors } from '~/styles/colors';

import Status from '../DeliveryStatus';
import DeliveryModal from '../Modal';
import { Container, MenuActionsContainer } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
  async function handleDelete() {
    Alert.delete().then(result => {
      if (result.value) {
        try {
          api.delete(`/delivery/${data.id}`);
          updateDeliveries();
          toast.success('Encomenda apagada com sucesso!');
          history.push('/deliveries');
        } catch (err) {
          toast.error('Essa encomenda não pode ser deletada!');
        }
      }
    });
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.recipient.name}</small>
      <small>{data.product}</small>
      <small>{data.recipient.city}</small>
      <small>{data.recipient.state}</small>
      <Status
        text={data.status}
        color={statusColors[data.status].color}
        background={statusColors[data.status].background}
      />
      <MenuActions>
        <MenuActionsContainer>
          <div>
            <DeliveryModal data={data} />
          </div>
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

DeliveryItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
