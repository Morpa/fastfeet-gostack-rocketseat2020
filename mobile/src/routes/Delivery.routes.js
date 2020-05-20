import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import DeliveryConfirm from '~/pages/DeliveryConfirm';
import DeliveryDetails from '~/pages/DeliveryDetails';
import DeliveryInformProblem from '~/pages/DeliveryInformProblem';
import DeliveryProblems from '~/pages/DeliveryProblems';
import colors from '~/styles/colors';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
	return (
		<Stack.Navigator initialRouteName="Entregas">
			<Stack.Screen
				options={{ headerShown: false }}
				name="Entregas"
				component={Deliveries}
			/>
			<Stack.Screen
				name="Detalhes"
				options={{
					title: 'Detalhes da encomenda',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: colors.primary,
					},
				}}
				component={DeliveryDetails}
			/>
			<Stack.Screen
				name="DeliveryProblems"
				options={{
					title: 'Visualizar Problemas',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: colors.primary,
					},
				}}
				component={DeliveryProblems}
			/>
			<Stack.Screen
				name="DeliveryInformProblem"
				options={{
					title: 'Informar Problema',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: colors.primary,
					},
				}}
				component={DeliveryInformProblem}
			/>
			<Stack.Screen
				name="DeliveryConfirm"
				options={{
					title: 'Confirmar Entrega',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: colors.primary,
					},
				}}
				component={DeliveryConfirm}
			/>
		</Stack.Navigator>
	);
}
