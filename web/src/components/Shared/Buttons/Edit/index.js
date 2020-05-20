import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { colors } from '~/styles/colors';

import { Container } from './styles';

export default function EditButton({ url, title, Icon }) {
  return (
    <Container>
      <Link to={url}>
        <Icon size={16} color={colors.info} />
        {title}
      </Link>
    </Container>
  );
}

EditButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};
