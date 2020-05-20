import React from 'react';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <Loader type="ThreeDots" color="#FFFFFF" />
    </Container>
  );
}
