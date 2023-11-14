import styles from './register.module.css';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { registerUser } from '../services/middlewares/authActions';


function RegisterPage() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  /*
    \. — экранирование точки (т.к. это тоже спецсимвол по ум.), значит строка должна содержать точку
    . – спец. символ, означающий наличие любого символа, кроме переноса строки
    то есть после точки должен быть хоть один символ
  */
  /*
    проверка на точку входит в логику компонента из библиотеки,
    но validationMessage пустой (т.к. встроенный API браузеров?),
    потому невозможно выполнить условный рендеринг по данному параметру
  */
  const emailRegExp = /\../;

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  /* во время фокуса любого инпута выключаем кнопку отправки,
  т.к. валидация происходит при блюре */
  const [isFocus, setIsFocus] = useState(false);

  const onChangeUserName = evt => {
    setUserName(evt.target.value);
  };
  const onFocusUserName = evt => {
    setHasUserNameError(false);
    setIsFocus(true);
  };
  const onBlurUserName = evt => {
    if (evt.target.value.length < 2) setHasUserNameError(true);
    setIsFocus(false);
  };

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
    setHasPasswordError((evt.target.value.length > 5) ? false : (evt.target.value.length > 0) ? true : false);
    setIsFocus(false);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    /* для танков только один аргумент может быть полезной нагрузкой,
      потому вносим данные в объект */
    /* если делать не танком, то можно как угодно
      Но диспатчим все равно, т.к. в замыкинии для функции registerUser
      нужно определить dispatch
    */
    // порядок ключей в объекте неважен для сервера. В задании password указан вторым ключом
    dispatch(registerUser( {email, name: userName, password} ));
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
          {!hasUserNameError && <div className={styles.stub} />}
          <EmailInput onChange={onChangeEmail} onFocusCapture={onFocusEmail} onBlurCapture={onBlurEmail} value={email} />
          {!hasEmailError && <div className={styles.stub} />}
          <PasswordInput onChange={onChangePassword} onFocusCapture={onFocusPassword} onBlurCapture={onBlurPassword} value={password} />
          {!hasPasswordError && <div className={styles.stub} />}
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size="medium"
            disabled={!isFocus && userName.length > 1 && !hasEmailError && email && password ? false : true}
          >
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
