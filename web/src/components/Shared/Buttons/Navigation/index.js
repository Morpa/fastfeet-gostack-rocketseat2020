import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function NavigationButton({ url, title, Icon }) {
  return (
    <Wrapper>
      <Link to={url}>
        <Icon size={16} color="#fff" />
        {title}
      </Link>
    </Wrapper>
  );
}

NavigationButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};
