import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const BaseInput = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  color: #444;
  border-radius: 4px;
  height: 45px;
  border: 1px solid #ddd;

  &::placeholder {
    color: #999;
  }
`;

export const Error = styled.span`
  color: ${colors.danger};
  margin-top: 8px;

  & + label {
    margin-top: 8px;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;

  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 9px;
  }

  & + label {
    margin-top: 18px;
  }
`;
