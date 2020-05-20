import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';

import {
	Container,
	Background,
	Content,
	CameraWrapper,
	Camera,
	Button,
} from './styles';

export default function DeliveryConfirmPhoto() {
	const navigation = useNavigation();
	const route = useRoute();

	const { id } = route.params;
	const idUser = useSelector(state => state.auth.id);

	const cameraRef = useRef(null);
	async function takePicture() {
		if (cameraRef) {
			const dataFile = new FormData();
			const options = { quality: 0.5, base64: true };
			const data = await cameraRef.current.takePictureAsync(options);

			dataFile.append('file', {
				uri: data.uri,
				name: 'signature.jpg',
				type: 'image/jpeg',
			});

			const response = await api.post('files', dataFile);

			await api.put(`deliveryman/${idUser}/delivery/${id}/finish`, {
				signature_id: response.data.id,
			});

			Alert.alert('Entrega finalizada com sucesso!');

			navigation.popToTop();
		}
	}

	return (
		<Container>
			<Background />
			<Content>
				<CameraWrapper>
					<Camera ref={cameraRef} type="back" captureAudio={false} />
				</CameraWrapper>
				<Button onPress={takePicture} loading={false}>
					Enviar
				</Button>
			</Content>
		</Container>
	);
}
