import styles from './login.module.css';

import { useState, useCallback, useEffect } from 'react';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  // создадим стейт текста ошибки инпута при его валидации, чтобы выполнять условный рендеринг
  const [hasEmailError, setHasEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

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
    console.log('войтиии');
  };



  return (
    <main className={styles.main}>
      <Form
        heading='Вход'
        onSubmit={onSubmit}
        name='logIn'
      >
        <EditZone>
          {/* Использую BlurCapture, т.к. на просто Blur в компоненте стоит свой обработчик (вызов кастомной валидации, написан создателями библиотеки) */}
          {/* При фокусе валидация очищает текст ошибки, потому заглушке нужно снова появляться */}
          <EmailInput onChange={onChangeEmail} onFocusCapture={onFocusEmail} onBlurCapture={onBlurEmail} value={email} />
          { !hasEmailError && <div className={styles.stub} /> }
          <PasswordInput onChange={onChangePassword} onFocusCapture={onFocusPassword} onBlurCapture={onBlurPassword} value={password} />
          { !hasPasswordError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </ActionsZone>
      </Form>

      <AdditionalActions>
        <Action
          placeholder='Вы — новый пользователь?'
          linkText='Зарегистрироваться'
          to='/register'
        />
        <Action
          placeholder='Забыли пароль?'
          linkText='Восстановить пароль'
          to='/forgot-password'
        />
      </AdditionalActions>
    </main>
  )
}

export default LoginPage;
