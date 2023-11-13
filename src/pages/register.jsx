import styles from './register.module.css';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';


function RegisterPage() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const onChangeUserName = evt => {
    setUserName(evt.target.value);
  };
  const onFocusUserName = evt => {
    setHasUserNameError(false);
  };
  const onBlurUserName = evt => {
    if (evt.target.value.length < 2) setHasUserNameError(true);
  };

  const onChangeEmail = evt => {
    setEmail(evt.target.value);
  };
  const onFocusEmail = evt => {
    setHasEmailError(false);
  };
  const onBlurEmail = evt => {
    setHasEmailError(!!evt.target.validationMessage);
  };

  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };
  const onFocusPassword = evt => {
    setHasPasswordError(false);
  };
  const onBlurPassword = evt => {
    setHasPasswordError( (evt.target.value.length > 5) ? false : (evt.target.value.length > 0) ? true : false);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    // dispatch();
    console.log('регииистр');
  };

  return (
    <main className={styles.main}>
      <Form
        heading='Регистрация'
        onSubmit={onSubmit}
        name='register'
      >
        <EditZone>
          <Input
            onChange={onChangeUserName}
            onFocus={onFocusUserName}
            onBlur={onBlurUserName}
            placeholder='Имя'
            type='text'
            value={userName}
            error={hasUserNameError}
            errorText='Не менее двух символов'
          />
          { !hasUserNameError && <div className={styles.stub} /> }
          <EmailInput onChange={onChangeEmail} onFocusCapture={onFocusEmail} onBlurCapture={onBlurEmail} value={email} />
          { !hasEmailError && <div className={styles.stub} /> }
          <PasswordInput onChange={onChangePassword} onFocusCapture={onFocusPassword} onBlurCapture={onBlurPassword} value={password} />
          { !hasPasswordError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </ActionsZone>
      </Form>

      <AdditionalActions>
        <Action
          placeholder='Уже зарегистрированы?'
          linkText='Войти'
          to='/login'
        />
      </AdditionalActions>
    </main>
  )
}

export default RegisterPage;
