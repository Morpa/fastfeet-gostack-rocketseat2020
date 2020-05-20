import { lighten } from 'polished';
import styled from 'styled-components';

import { ButtonBasic } from '~/components/Shared/Buttons';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 120px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;

  > section {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;

export const Grid = styled.div`
  height: 400px;

  > section {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    padding-left: 25px;
    padding-right: 13px;

    strong:last-child {
      text-align: right;
    }

    strong {
      font-size: 16px;
      color: #444;
    }

    margin-bottom: 15px;
  }

  > div + div {
    margin-top: 20px;
  }
`;

export const Button = styled(ButtonBasic)`
  width: 100px;
  height: 36px;
  background: #7d40e7;

  &:disabled {
    cursor: not-allowed;
    background: ${lighten(0.2, '#7D40E7')};
  }
`;
