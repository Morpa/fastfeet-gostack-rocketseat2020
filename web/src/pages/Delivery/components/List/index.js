import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import { parseISO, format } from 'date-fns';

import Loading from '~/components/Loading';
import NoResults from '~/components/NoResults';
import { ButtonNavigation } from '~/components/Shared/Buttons';
import HeaderList from '~/components/Shared/Headers/List';
import { InputSearch } from '~/components/Shared/Inputs';
import api from '~/services/api';

import DeliveryItem from '../DeliveryItem';
import { Container, Content, Grid, Button } from './styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function formatDates(data) {
    return data.map(delivery => ({
      ...delivery,
      start_dateFormated: delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormated: delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  const loadDeliveries = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/delivery', {
      params: {
        page,
      },
    });

    const data = formatDates(response.data);

    setDeliveries(data);
    setLoading(false);
  }, [page]);

  async function handleSearchDelivery(e) {
    setLoading(true);
    setPage(1);

    const response = await api.get('/delivery', {
      params: {
        q: e.target.value,
        page,
      },
    });

    const data = formatDates(response.data);

    setDeliveries(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries, page]);

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando encomendas">
          <InputSearch
            onChange={handleSearchDelivery}
            type="text"
            placeholder="Buscar por encomendas"
          />
          <ButtonNavigation url="add" Icon={MdAdd} title="Cadastrar" />
        </HeaderList>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Destinatário</strong>
            <strong>Produto</strong>
            <strong>Cidade</strong>
            <strong>Estado</strong>
            <strong>Status</strong>
            <strong>Ações</strong>
          </section>

          {loading && <Loading />}

          {deliveries.length === 0 && <NoResults />}

          {deliveries.map(delivery => (
            <DeliveryItem
              updateDeliveries={loadDeliveries}
              key={delivery.id}
              data={delivery}
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
            disabled={deliveries.length < 5}
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
