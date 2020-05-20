import React, { useEffect, useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import Loading from '~/components/Loading';
import NoResults from '~/components/NoResults';
import { ButtonNavigation } from '~/components/Shared/Buttons';
import HeaderList from '~/components/Shared/Headers/List';
import { InputSearch } from '~/components/Shared/Inputs';
import api from '~/services/api';

import DeliverymenItem from '../DeliverymenItem';
import { Container, Content, Grid, Button } from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadDeliverymen = useCallback(async () => {
    setLoading(true);
    const response = await api.get('/deliverymen', {
      params: {
        page,
      },
    });

    setDeliverymen(response.data);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadDeliverymen();
  }, [loadDeliverymen, page]);

  async function handleSearchDeliveryman(e) {
    setLoading(true);
    setPage(1);

    const response = await api.get('/deliverymen', {
      params: {
        q: e.target.value,
        page,
      },
    });

    setDeliverymen(response.data);
    setLoading(false);
  }

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando entregadores">
          <InputSearch
            onChange={handleSearchDeliveryman}
            type="text"
            placeholder="Buscar por entregadores"
          />
          <ButtonNavigation url="add" Icon={MdAdd} title="Cadastrar" />
        </HeaderList>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Foto</strong>
            <strong>Nome</strong>
            <strong>Email</strong>
            <strong>Ações</strong>
          </section>
          {loading && <Loading />}

          {deliverymen.length === 0 && <NoResults />}

          {deliverymen.map(deliveryman => (
            <DeliverymenItem
              key={deliveryman.id}
              data={deliveryman}
              updateDeliverymen={loadDeliverymen}
            />
          ))}
        </Grid>
        <section>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            Voltar
          </Button>
          <Button
            disabled={deliverymen.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </Button>
        </section>
      </Content>
    </Container>
  );
}
