import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';

import Logo from '~/assets/fastfeet.svg';
import { ButtonBasic } from '~/components/Shared/Buttons';
import { InputSimple } from '~/components/Shared/Inputs';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={Logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit}>
        <InputSimple
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <InputSimple
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="*************"
        />

        <ButtonBasic type="submit">
          {loading ? 'Carregando...' : 'Acessar'}
        </ButtonBasic>
      </Form>
    </>
  );
}
