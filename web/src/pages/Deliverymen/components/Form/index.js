import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';

import { ButtonSave, ButtonBack } from '~/components/Shared/Buttons';

import { InputSimple, InputPhoto } from '~/components/Shared/Inputs';
import HeaderForm from '~/components/Shared/Headers/Form';
import api from '~/services/api';

import { Container, Content, UnForm } from './styles';

export default function DeliverymanForm() {
  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        const response = await api.get(`/deliverymen/${id}`);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
      }
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      if (id) {
        await api.put(`/deliverymen/${id}`, {
          name: data.name,
          email: data.email,
          avatar_id: responseFile?.data?.id,
        });
        toast.success('Entregador editado com sucesso!');
      } else {
        await api.post('/deliverymen', {
          name: data.name,
          email: data.email,
          avatar_id: responseFile?.data?.id,
        });
        toast.success('Entregador criado com sucesso!');
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
        <HeaderForm title="Cadastro de entregadores">
          <ButtonBack />
          <ButtonSave action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <InputPhoto name="avatar" />
          <InputSimple
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do entregador"
          />
          <InputSimple
            label="Email"
            name="email"
            type="email"
            placeholder="exemplo@fastfeet.com"
          />
        </UnForm>
      </Content>
    </Container>
  );
}
