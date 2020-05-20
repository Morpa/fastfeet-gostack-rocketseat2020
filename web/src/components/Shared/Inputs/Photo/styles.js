import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
`;

export const Content = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  cursor: pointer;

  > strong {
    font-size: 16px;
    color: #ddd;
  }

  border: 2px dashed #ddd;
  border-radius: 50%;

  > img {
    border-radius: 50%;
  }

  > input {
    display: none;
  }
`;
