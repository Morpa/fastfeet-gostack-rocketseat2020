import styled from 'styled-components/native';

import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.View`
	background: #fff;
	flex: 1;
`;

export const Background = styled.View`
	background: ${colors.primary};
	height: 155px;
`;

export const Content = styled.View`
	align-items: center;
	margin-top: -60px;
	height: 200px;
`;

export const Form = styled.View`
	width: 335px;
`;

export const Input = styled.TextInput.attrs({
	multiline: true,
	textAlignVertical: 'top',
	placeholder: 'Inclua aqui o problema que ocorreu na entrega.',
	placeholderTextColor: '#999999',
})`
	background: #fff;
	border-radius: 4px;
	padding: 20px;
	height: 350px;
	font-size: 16px;
	border: 1px solid #eee;
`;

export const SubmitButton = styled(Button)`
	background: ${colors.primary};
	height: 40px;
	margin-top: 15px;
	width: 100%;
`;
