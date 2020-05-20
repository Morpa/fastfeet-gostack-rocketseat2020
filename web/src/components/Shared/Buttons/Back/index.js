import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import ButtonWithIcon from '../Icon';

export default function BackButton() {
  return (
    <ButtonWithIcon
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background="#CCC"
    />
  );
}
