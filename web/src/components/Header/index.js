import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Logo from '~/assets/fastfeet.svg';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Navigation, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="FastFeet" />
          <Navigation>
            <NavLink to="/deliveries">encomendas</NavLink>
            <NavLink to="/deliverymen">entregadores</NavLink>
            <NavLink to="/recipients">destinatários</NavLink>
            <NavLink to="/problems">problemas</NavLink>
          </Navigation>
        </nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSingOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
