import React, { useState, useEffect, useCallback } from 'react';

import Loading from '~/components/Loading';
import NoResults from '~/components/NoResults';
import HeaderList from '~/components/Shared/Headers/List';
import api from '~/services/api';

import ProblemItem from './components/ProblemItem';
import { Container, Content, Grid, Button } from './styles';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProblems = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/deliveries/problems', {
      params: {
        page,
      },
    });
    setProblems(response.data);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  return (
    <Container>
      <Content>
        <HeaderList title="Problemas na entrega" />
        <Grid>
          <section>
            <strong>Encomenda</strong>
            <strong>Problema</strong>
            <strong>Ações</strong>
          </section>

          {loading && <Loading />}

          {problems.length === 0 && <NoResults />}

          {problems.map(problem => (
            <ProblemItem
              updateProblems={loadProblems}
              key={problem.id}
              data={problem}
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
            disabled={problems.length < 5}
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
