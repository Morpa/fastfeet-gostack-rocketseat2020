import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import colors from '~/styles/colors';

import {
	Container,
	Background,
	Content,
	TitleContainer,
	Title,
	Problem,
	Description,
	Date,
} from './styles';

export default function Problems() {
	const route = useRoute();
	const { id } = route.params;
	const [problems, setProblems] = useState([]);

	async function loadProblems(idDelivery) {
		const { data } = await api.get(`delivery/${idDelivery}/problems`);

		setProblems(data);
	}

	useEffect(() => {
		loadProblems(id);
	}, [id]);

	return (
		<Container>
			<StatusBar backgroundColor={colors.primary} barStyle="light-content" />
			<Background />
			<Content>
				<TitleContainer>
					<Title>Encomenda {id}</Title>
				</TitleContainer>

				{problems.map(item => (
					<Problem key={item.id}>
						<Description>{item.description}</Description>
						<Date>{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</Date>
					</Problem>
				))}
			</Content>
		</Container>
	);
}
