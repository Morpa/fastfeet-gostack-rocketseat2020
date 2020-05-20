import React, { useMemo } from 'react';
import { StatusBar, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import {
	useRoute,
	useNavigation,
	CommonActions,
} from '@react-navigation/native';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';
import colors from '~/styles/colors';

import {
	Container,
	Background,
	Content,
	Card,
	TitleContainer,
	Title,
	Label,
	Value,
	Status,
	MenuActions,
	Option,
	OptionTitle,
} from './styles';

export default function DeliveryDetails() {
	const route = useRoute();
	const navigation = useNavigation();
	const { delivery } = route.params;
	const deliverymanId = useSelector(state => state?.auth?.id);

	const deliveryStartDate = useMemo(
		() =>
			delivery.start_date
				? format(parseISO(delivery.start_date), 'dd / MM / yyyy')
				: '- - / - - / - -',
		[delivery.start_date]
	);

	const deliveryEndDate = useMemo(
		() =>
			delivery.end_date
				? format(parseISO(delivery.end_date), 'dd / MM / yyyy')
				: '- - / - - / - -',
		[delivery.end_date]
	);

	async function handleStartDelivery() {
		try {
			await api.put(`deliveryman/${deliverymanId}/delivery/${delivery.id}`);

			navigation.dispatch(CommonActions.goBack());
		} catch (error) {
			Alert.alert('Falha no registro da retirada', 'Tente novamente.');
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={colors.primary} barStyle="light-content" />
			<Background />
			<Content>
				<Card>
					<TitleContainer>
						<Icon name="local-shipping" color={colors.primary} size={20} />
						<Title>Informações da entrega</Title>
					</TitleContainer>
					<Label>DESTINATÁRIO</Label>
					<Value>{delivery.recipient.name}</Value>
					<Label>ENDEREÇO DE ENTREGA</Label>
					<Value>
						{delivery.recipient.street}, {delivery.recipient.number},{' '}
						{delivery.recipient.city} - {delivery.recipient.state},{' '}
						{delivery.recipient.zip_code}
					</Value>
					<Label>PRODUTO</Label>
					<Value>{delivery.product}</Value>
				</Card>

				<Card>
					<TitleContainer>
						<Icon name="event" color={colors.primary} size={20} />
						<Title>Situação da entrega</Title>
					</TitleContainer>
					<Label>STATUS</Label>
					<Status>{delivery.status}</Status>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<View>
							<Label>DATA DE RETIRADA</Label>
							<Value>{deliveryStartDate || '- - / - - / - -'}</Value>
						</View>

						<View>
							<Label>DATA DE ENTREGA</Label>
							<Value>{deliveryEndDate || '- - / - - / - -'}</Value>
						</View>
					</View>
				</Card>
				{!delivery.end_date && (
					<MenuActions>
						<Option
							onPress={() =>
								navigation.navigate('DeliveryInformProblem', {
									id: delivery.id,
								})
							}
						>
							<Icon name="highlight-off" color={colors.danger} size={20} />
							<OptionTitle>Informar Problema</OptionTitle>
						</Option>
						<Option
							onPress={() =>
								navigation.navigate('DeliveryProblems', { id: delivery.id })
							}
						>
							<Icon name="info-outline" color={colors.ViewProblems} size={20} />
							<OptionTitle>Visualizar Problemas</OptionTitle>
						</Option>
						{delivery.status === 'Pendente' ? (
							<Option onPress={handleStartDelivery}>
								<Icon name="local-shipping" color={colors.primary} size={20} />
								<OptionTitle>Realizar Retirada</OptionTitle>
							</Option>
						) : (
							<Option
								onPress={() =>
									navigation.navigate('DeliveryConfirm', { id: delivery.id })
								}
							>
								<Icon name="check-circle" color={colors.primary} size={20} />
								<OptionTitle>Confirmar Entrega</OptionTitle>
							</Option>
						)}
					</MenuActions>
				)}
			</Content>
		</Container>
	);
}
