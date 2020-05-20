import styled from 'styled-components/native';

import Text from '~/components/Text';
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

export const TitleContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

export const Title = styled(Text)`
	font-size: 16px;
	font-weight: bold;
	color: #fff;
	margin-left: 10px;
`;

export const Problem = styled.View`
	width: 335px;
	border-radius: 4px;
	background: #fff;
	height: 55px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 19px 11px 19px 19px;
	margin-bottom: 15px;
	border: 1px solid #eee;
`;

export const Description = styled(Text)`
	color: #999999;
	font-size: 16px;
`;

export const Date = styled(Text)`
	color: #c1c1c1;
	font-size: 12px;
`;
