import styles from './reset-password.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { resetPassword } from '../services/middlewares/authQueries';
import { getResetPasswordPending, getResetPasswordSuccess } from '../services/selectors/authSelector';
import { setResetPasswordSuccess } from '../services/slices/authSlice';

import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Toaster } from 'react-hot-toast';
import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { stellarToast } from '../utils/utils';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [key, setKey] = useState('');
  const [hasKeyError, setHasKeyError] = useState(false);

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);

  const resetPasswordSucces = useSelector(getResetPasswordSuccess);
  const resetPasswordPending = useSelector(getResetPasswordPending);



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
    dispatch(resetPassword({password, code: key}));
  };

  useEffect(() => {
    switch(resetPasswordSucces) {
      case true:
        stellarToast('Пароль успешно изменён', 'ok');
        setTimeout(() => {navigate('/', { replace: true })}, 3200);
        /* обнулим статус успешности, чтобы при возврате назад,
          на forgot-password (т.к. reset-password мы реплейсим на home),
          не было переадресации домой */
        dispatch(setResetPasswordSuccess(null));
        break;
      case false:
        stellarToast('Что-то пошло не так', 'error');
        break;
      default:
        break;
    }
  }, [resetPasswordSucces]);

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

