import styles from './login.module.css';

import { useState, useEffect } from 'react';

import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../services/hooks';
import { login } from '../services/middlewares/authActions';
import { getUserPending, getUserSuccess } from '../services/selectors/authSelector';
import { useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { stellarToast } from '../utils/utils';
import { setUserSuccess } from '../services/slices/authSlice';
import useWindowSize from '../utils/hooks/useWindowSize';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const sizeOfInput = windowSize.width > 599 ? 'default' : 'small';
  const sizeOfButton = windowSize.width > 599 ? 'medium' : 'small';

  const [email, setEmail] = useState('');
  /* создадим стейт текста ошибки инпута при его валидации,
  чтобы выполнять условный рендеринг */
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);

  const userPending = useSelector(getUserPending);
  const userSuccess = useSelector(getUserSuccess);



  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = e => {
    setEmail(e.target.value);
  };
  const onFocusEmail: React.FocusEventHandler<HTMLInputElement> = e => {
    setHasEmailError(false);
    setIsFocus(true);
  };
  const onBlurEmail: React.FocusEventHandler<HTMLInputElement> = e => {
    const regExpSucces = emailRegExp.test(e.target.value);
    const length = e.target.value.length;

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

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setPassword(evt.target.value);
  };
  const onFocusPassword: React.FocusEventHandler<HTMLInputElement> = evt => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword: React.FocusEventHandler<HTMLInputElement> = evt => {
    setHasPasswordError( (evt.target.value.length > 5) ? false : (evt.target.value.length > 0) ? true : false);
    setIsFocus(false);
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    switch(userSuccess) {
      // при успехе, защищенный роут перенаправит домой
      case false:
        dispatch(setUserSuccess(null));
        stellarToast('Почта или пароль неверны', 'error');
        break;
      default:
        break;
    }
  }, [userSuccess, navigate, dispatch]);



  return (
    <main className={styles.main}>
      <Toaster />
      <Form
        heading='Вход'
        onSubmit={onSubmit}
        name='logIn'
      >
        <EditZone>
          {/* Использую BlurCapture, т.к. на просто Blur в компоненте стоит свой обработчик (вызов кастомной валидации, написан создателями библиотеки) */}
          {/* При фокусе валидация очищает текст ошибки, потому заглушке нужно снова появляться */}
          <EmailInput onChange={onChangeEmail} onFocusCapture={onFocusEmail} onBlurCapture={onBlurEmail} value={email} size={sizeOfInput} />
          { !hasEmailError && <div className={styles.stub} /> }
          <PasswordInput onChange={onChangePassword} onFocusCapture={onFocusPassword} onBlurCapture={onBlurPassword} value={password} size={sizeOfInput} />
          { !hasPasswordError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size={sizeOfButton}
            disabled={!isFocus
              && !hasEmailError
              && email
              && password
              && !hasPasswordError
              && !userPending
              ? false : true}
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
