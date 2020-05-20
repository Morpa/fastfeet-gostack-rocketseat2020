import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Alert from '~/components/Alerts/Delete';
import MenuActions from '~/components/MenuActions';
import NamePhoto from '~/components/NameOrPhoto';
import { ButtonEdit } from '~/components/Shared/Buttons';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MenuActionsContainer } from './styles';

export default function DeliverymanItem({ data, updateDeliverymen }) {
  async function handleDelete() {
    Alert.delete().then(result => {
      if (result.value) {
        try {
          api.delete(`/deliverymen/${data.id}`);
          updateDeliverymen();
          toast.success('Entregador apagado com sucesso!');
          history.push('/deliverymen');
        } catch (err) {
          toast.error('Esse entregador ainda possui encomendas para entregar!');
        }
      }
    });
  }

  return (
    <Container>
      <small>#{data.id}</small>
      {data.avatar ? (
        <img src={data?.avatar?.url} alt="AvatarUrl" />
      ) : (
        <NamePhoto name={data.name} />
      )}
      <small>{data.name}</small>
      <small>{data.email}</small>
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

DeliverymanItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateDeliverymen: PropTypes.func.isRequired,
};
