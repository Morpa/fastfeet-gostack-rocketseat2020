import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';

import { useRoute, CommonActions } from '@react-navigation/native';

import api from '~/services/api';
import colors from '~/styles/colors';

import {
	Container,
	Background,
	Content,
	Form,
	Input,
	SubmitButton,
} from './styles';

export default function SendProblem({ navigation }) {
	const route = useRoute();
	const { id } = route.params;

	const [loading, setLoading] = useState(false);
	const [description, setDescription] = useState('');

	async function handleSubmit() {
		try {
			setLoading(true);
			await api.post(`delivery/${id}/problem`, {
				description,
			});

			navigation.dispatch(CommonActions.goBack());

			setLoading(false);
		} catch (error) {
			Alert.alert('Falha no cadastro', 'Verifique os dados.');
			setLoading(false);
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={colors.primary} barStyle="light-content" />
			<Background />
			<Content>
				<Form>
					<Input value={description} onChangeText={setDescription} />
					<SubmitButton onPress={handleSubmit} loading={loading}>
						Enviar
					</SubmitButton>
				</Form>
			</Content>
		</Container>
	);
}
