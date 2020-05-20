import React from 'react';

import PropTypes from 'prop-types';

import Routes from './routes';

export default function Reports({ match }) {
  return (
    <>
      <Routes path={match.path} />
    </>
  );
}

Reports.propTypes = {
  match: PropTypes.shape().isRequired,
};
