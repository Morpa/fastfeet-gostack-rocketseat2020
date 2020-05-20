import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';

import { ButtonSave, ButtonBack } from '~/components/Shared/Buttons';
import { InputSimple, InputMask } from '~/components/Shared/Inputs';
import HeaderForm from '~/components/Shared/Headers/Form';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function RecipientForm() {
  const { id } = useParams();
  const formRef = useRef();

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        const response = await api.get(`/recipient/${id}`);

        formRef.current.setData(response.data);
      }
    }
    loadInitialData();
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string().notRequired(),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('O estado é obrigatório'),
        zip_code: Yup.string().required('O CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/recipient/${id}`, {
          name: data.name,
          street: data.street,
          number: data.number,
          complement: data?.complement,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        });
        toast.success('Destinatário editado com sucesso!');
        history.push('/recipients');
      } else {
        await api.post('/recipient', {
          name: data.name,
          street: data.street,
          number: data.number,
          complement: data?.complement,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        });
        toast.success('Destinatário criado com sucesso!');
      }

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Cadastro de destinatário">
          <ButtonBack />
          <ButtonSave action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <InputSimple
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do destinatário"
          />
          <div>
            <InputSimple
              label="Rua"
              name="street"
              type="text"
              placeholder="Rua do destinatário"
            />
            <InputSimple
              label="Número"
              name="number"
              type="number"
              placeholder="Número da casa"
            />
            <InputSimple label="Complemento" name="complement" type="text" />
          </div>
          <div>
            <InputSimple
              label="Cidade"
              name="city"
              type="text"
              placeholder="Cidade do destinatário"
            />
            <InputSimple
              label="Estado"
              name="state"
              type="text"
              placeholder="Estado do destinatário"
            />
            <InputMask
              label="CEP"
              name="zip_code"
              mask="99999-999"
              maskplaceholder={null}
              placeholder="_____-___"
            />
          </div>
        </UnForm>
      </Content>
    </Container>
  );
}
