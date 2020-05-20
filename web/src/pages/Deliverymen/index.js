import React from 'react';

import PropTypes from 'prop-types';

import Routes from './routes';

export default function Deliverymen({ match }) {
  return (
    <>
      <Routes path={match.path} />
    </>
  );
}

Deliverymen.propTypes = {
  match: PropTypes.shape().isRequired,
};
