import styles from './forgot-password.module.css';

import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
  };
  const onFocusEmail = evt => {
    setHasEmailError(false);
    setIsFocus(true);
  };
  const onBlurEmail = evt => {
    const regExpSucces = emailRegExp.test(evt.target.value);
    const length = evt.target.value.length;

    setIsFocus(false);

    if (length === 0) {
      setHasEmailError(false);
      return;
    }
    if (!regExpSucces) {
      setHasEmailError(true);
      return;
    }
  };

  const onSubmit = evt => {
    evt.preventDefault();
    // dispatch();
    console.log('востановииить');
  };

  return (
    <main className={styles.main}>
      <Form
        heading='Восстановление пароля'
        onSubmit={onSubmit}
        name='forgot-password'
      >
        <EditZone>
          <EmailInput
          onChange={onChangeEmail}
          onFocusCapture={onFocusEmail}
          onBlurCapture={onBlurEmail}
          value={email}
          placeholder='Укажите e-mail'
          />
          { !hasEmailError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size="medium"
            disabled={!isFocus && !hasEmailError && email ? false : true}
          >
            Восстановить
          </Button>
        </ActionsZone>
      </Form>

      <AdditionalActions>
        <Action
          placeholder='Вспомнили пароль?'
          linkText='Войти'
          to='/login'
        />
      </AdditionalActions>
    </main>
  )
}

export default ForgotPasswordPage;
