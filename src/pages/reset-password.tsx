import styles from './reset-password.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { useNavigate } from 'react-router';

import { resetPassword } from '../services/middlewares/authQueries';
import { getResetCodeSuccess, getResetPasswordPending, getResetPasswordSuccess, getUserFromState, getUserPending, getUserSuccess } from '../services/selectors/authSelector';
import { setResetCodeSuccess, setResetPasswordSuccess, setUserSuccess } from '../services/slices/authSlice';

import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Toaster } from 'react-hot-toast';
import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { stellarToast } from '../utils/utils';
import { login } from '../services/middlewares/authActions';
import useWindowSize from '../utils/hooks/useWindowSize';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const sizeOfInput = windowSize.width > 599 ? 'default' : 'small';
  const sizeOfButton = windowSize.width > 599 ? 'medium' : 'small';

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [key, setKey] = useState('');
  const [hasKeyError, setHasKeyError] = useState(false);

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);

  const resetCodeSuccess = useSelector(getResetCodeSuccess);
  const resetPasswordSucces = useSelector(getResetPasswordSuccess);
  const resetPasswordPending = useSelector(getResetPasswordPending);

  // данные для автомат. входа после смены пароля
  const user = useSelector(getUserFromState);
  const userSuccess = useSelector(getUserSuccess);

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setPassword(evt.target.value);
  };
  const onFocusPassword: React.FocusEventHandler<HTMLInputElement> = evt => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword: React.FocusEventHandler<HTMLInputElement> = evt => {
    const length = evt.target.value.length;

    setIsFocus(false);

    if (length < 6) setHasPasswordError(true);
    if (length === 0) setHasPasswordError(false);
  };


  const onChangeKey: React.ChangeEventHandler<HTMLInputElement> = evt => {
    setKey(evt.target.value);
  };
  const onFocusKey: React.FocusEventHandler<HTMLInputElement> = evt => {
    setHasKeyError(false);
    setIsFocus(true);
  };
  const onBlurKey: React.FocusEventHandler<HTMLInputElement> = evt => {
    if (evt.target.value.length < 4) setHasKeyError(true);
    setIsFocus(false);
  };


  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(resetPassword({password, token: key}));
  };



  useEffect(() => {
    switch(resetPasswordSucces) {
      case true:
        stellarToast('Пароль успешно изменён! Выполняется вход в аккаунт...', 'ok');
        /* обнулим статус успешности, чтобы при возврате назад,
          на forgot-password (т.к. reset-password мы реплейсим на home),
          не было переадресации домой */
        /* ошибочное решение в комментарии выше – после авторизации
          пользователь не должен попадать на экраны восстановления пароля,
          и защищенный роут перенаправляет как раз домой */
        /* НО ВСЁ ЖЕ зануляем статусы, чтобы при выходе из аккаунта,
          другой человек не получал некорректные уведомления.
          И чтобы просто уведомления не дублировались */
        dispatch(setResetPasswordSuccess(null));
        dispatch(setResetCodeSuccess(null));
        if (user) {
          dispatch(login(user.email, password));
        } else {
          /* Если вдруг не получится получить юзера при автоматическом входе */
          stellarToast('Пароль изменён, но не удалось выполнить вход', 'error');
        }
        break;
      case false:
        dispatch(setResetPasswordSuccess(null));
        dispatch(setResetCodeSuccess('sended'));
        stellarToast('Что-то пошло не так', 'error');
        break;
      default:
        break;
    }
  }, [resetPasswordSucces, dispatch, navigate]);

  useEffect(() => {
    switch(user && userSuccess) {
      case true:
        // при успешном получении данных о пользователе - защищ. роут перенаправит нас
        dispatch(setUserSuccess(null));
        dispatch(setResetCodeSuccess(null));
        break;
      case false:
        dispatch(setUserSuccess(null));
        stellarToast('Не удалось войти, попробуйте ещё раз позднее', 'error');
        break;
      default:
        break;
    }
  }, [user, userSuccess]);

  // Логика для ситуации, когда пользователь пытается сразу попасть на reset-password
  useEffect(() => {
    if (!resetCodeSuccess) navigate('/forgot-password');
  }, [resetCodeSuccess]);



  return (
    <main className={styles.main}>
      <Toaster />
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
          autoComplete='new-password'
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
            size={sizeOfInput}
          />
          { !hasKeyError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button htmlType="submit" type="primary" size={sizeOfButton}
            disabled={!isFocus
              && !hasPasswordError
              && !hasKeyError
              && password
              && key
              && !resetPasswordPending
              ? false : true}
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
