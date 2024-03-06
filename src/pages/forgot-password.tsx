import styles from './forgot-password.module.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { useNavigate } from 'react-router';

import { sendResetCode } from '../services/middlewares/authQueries';
import { getResetCodeSuccess, getResetPasswordPending, getResetPasswordSuccess } from '../services/selectors/authSelector';
import { setEmailOnStorage, setResetCodeSuccess, setResetPasswordSuccess } from '../services/slices/authSlice';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Toaster } from 'react-hot-toast';
import Form from '../components/Form/Form';
import EditZone from '../components/Form/EditZone/EditZone';
import ActionsZone from '../components/Form/ActionsZone/ActionsZone';
import AdditionalActions from '../components/Form/AdditionalActions/AdditionalActions';
import Action from '../components/Form/Action/Action';
import { stellarToast } from '../utils/utils';
import useWindowSize from '../utils/hooks/useWindowSize';

function ForgotPasswordPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const sizeOfInput = windowSize.width > 599 ? 'default' : 'small';
  const sizeOfButton = windowSize.width > 599 ? 'medium' : 'small';

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  // см. register.jsx
  const [isFocus, setIsFocus] = useState(false);

  const resetCodeSuccess = useSelector(getResetCodeSuccess);
  const resetPasswordPending = useSelector(getResetPasswordPending);



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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEmailOnStorage(email));
    dispatch(sendResetCode({email}));
  };

  useEffect(() => {
    switch(resetCodeSuccess) {
      case true:
        stellarToast('Код отправлен на вашу почту', 'ok');
        setTimeout(() => { navigate('/reset-password') }, 3200);
        /* Меняем статус успешности отправки кода, чтобы при возврате назад
        не было переадресации на reset-password, мало ли человек перепутал почту */
        dispatch(setResetCodeSuccess('sended'));
        break;
      case false:
        dispatch(setResetCodeSuccess(null));
        stellarToast('Что-то пошло не так', 'error');
        break;
      default:
        break;
    }
  }, [resetCodeSuccess, navigate, dispatch]);



  return (
    <main className={styles.main}>
      <Toaster/>
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
          autoComplete='email'
          size={sizeOfInput}
          />
          { !hasEmailError && <div className={styles.stub} /> }
        </EditZone>

        <ActionsZone>
          <Button
            htmlType="submit" type="primary" size={sizeOfButton}
            disabled={!isFocus && !hasEmailError && email
              && !resetPasswordPending ? false : true}
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
