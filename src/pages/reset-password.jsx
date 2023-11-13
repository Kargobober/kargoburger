import styles from './reset-password.module.css';

import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';

function ResetPasswordPage() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [key, setKey] = useState('');
  const [hasKeyError, setHasKeyError] = useState(false);

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);


  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };
  const onFocusPassword = evt => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword = evt => {
    const length = evt.target.value.length;

    setIsFocus(false);

    if (length < 6) setHasPasswordError(true);
    if (length === 0) setHasPasswordError(false);
  };


  const onChangeKey = (evt) => {
    setKey(evt.target.value);
  };
  const onFocusKey = (evt) => {
    setHasKeyError(false);
    setIsFocus(true);
  };
  const onBlurKey = (evt) => {
    if (evt.target.value.length < 4) setHasKeyError(true);
    setIsFocus(false);
  };


  const onSubmit = evt => {
    evt.preventDefault();
    // dispatch();
    console.log('обновить пароль');
  };

  return (
    <main className={styles.main}>
      <Form
        heading='Восстановление пароля'
        onSubmit={onSubmit}
        name='reset-password'
      >
        <EditZone>
          <PasswordInput
          onChange={onChangePassword}
          onFocusCapture={onFocusPassword}
          onBlurCapture={onBlurPassword}
          value={password}
          placeholder='Введите новый пароль'
          />
          { !hasPasswordError && <div className={styles.stub} /> }
          <Input
            onChange={onChangeKey}
            onFocus={onFocusKey}
            onBlur={onBlurKey}
            placeholder='Введите код из письма'
            value={key}
            error={hasKeyError}
            errorText='Не менее 4 символов'
          />
          { !hasKeyError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size="medium"
            disabled={!isFocus && !hasPasswordError && !hasKeyError && password && key ? false : true}
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

export default ResetPasswordPage;

