import styles from './login.module.css';

import { useState, useCallback, useEffect } from 'react';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { login } from '../services/middlewares/authActions';

function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  /* создадим стейт текста ошибки инпута при его валидации,
  чтобы выполнять условный рендеринг */
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

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

  const onChangePassword = evt => {
    setPassword(evt.target.value);
  };
  const onFocusPassword = evt => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword = evt => {
    setHasPasswordError( (evt.target.value.length > 5) ? false : (evt.target.value.length > 0) ? true : false);
    setIsFocus(false);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(login(email, password));
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
          <Button htmlType="submit" type="primary" size="medium"
            disabled={!isFocus && !hasEmailError && email && password && !hasPasswordError? false : true}
          >
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
