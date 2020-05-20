import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import Loading from '~/components/Loading';
import NoResults from '~/components/NoResults';
import { ButtonNavigation } from '~/components/Shared/Buttons';
import HeaderList from '~/components/Shared/Headers/List';
import { InputSearch } from '~/components/Shared/Inputs';
import api from '~/services/api';

import RecipientItem from '../RecipientItem';
import { Container, Content, Grid, Button } from './styles';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecipients = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/recipient', {
      params: {
        page,
      },
    });

    setRecipients(response.data);
    setLoading(false);
  }, [page]);

  async function handleSearchRecipient(e) {
    setLoading(true);
    setPage(1);

    const response = await api.get('/recipient', {
      params: {
        page,
        q: e.target.value,
      },
    });

    setRecipients(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients, page]);

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando destinatários">
          <InputSearch
            onChange={handleSearchRecipient}
            type="text"
            placeholder="Buscar por destinatários"
          />
          <ButtonNavigation url="add" Icon={MdAdd} title="Cadastrar" />
        </HeaderList>
        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Nome</strong>
            <strong>Endereço</strong>
            <strong>Ações</strong>
          </section>

          {loading && <Loading />}

          {recipients.length === 0 && <NoResults />}

          {recipients.map(recipient => (
            <RecipientItem
              updateRecipients={loadRecipients}
              key={recipient.id}
              data={recipient}
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
            disabled={recipients.length < 5}
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
