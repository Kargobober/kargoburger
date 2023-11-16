import { useState, useEffect } from 'react';
import Form from '../../Form/Form';
import { Toaster } from 'react-hot-toast';
import EditZone from '../../Form/EditZone/EditZone';
import ActionsZone from '../../Form/ActionsZone/ActionsZone';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './User.module.css';
import { useLocation } from 'react-router';
import { getChangeUserDataPending, getChangeUserDataSuccess, getUserPending, getUserState, getUserSuccess } from '../../../services/selectors/authSelector';
import { changeUserData } from '../../../services/middlewares/authQueries';
import { stellarToast } from '../../../utils/utils';

function User() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const user = useSelector(getUserState);
  const userPending = useSelector(getUserPending);
  const userSuccess = useSelector(getUserSuccess);
  const changeUserDataPending = useSelector(getChangeUserDataPending);
  const changeUserDataSuccess = useSelector(getChangeUserDataSuccess);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const [needButtons, setNeedButtons] = useState(false);



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
    setWasChanged(true);
  };
  const onFocusPassword = evt => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword = evt => {
    setHasPasswordError((evt.target.value.length > 5) ? false : (evt.target.value.length > 0) ? true : false);
    setIsFocus(false);
  };

// КНОПКИ
  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(changeUserData({ name: userName, email, password }));
  };
  const revertChanges = (evt) => {
    evt.preventDefault();
    setUserName(user.name);
    setEmail(user.email);
    setPassword('');
    setWasChanged(false);
  };



  useEffect(() => {
    setNeedButtons(false);
  }, [location.pathname]);
  useEffect(() => {
    if (isFocus) setNeedButtons(true);
  }, [isFocus]);

  useEffect(() => {
    if (user && userSuccess) {
      setUserName(user.name);
      setEmail(user.email);
      setPassword('');
      setWasChanged(false);
    }
  }, [location.pathname, user, userSuccess]);

  useEffect(() => {
    if (user && userSuccess) {
      if (!(user.name === userName && user.email === email)) {
        setWasChanged(true);
      } else {
        setWasChanged(false);
      }
    }
  }, [user, userName, email, userSuccess]);

  useEffect(() => {
    switch(changeUserDataSuccess) {
      case true:
        stellarToast('Данные успешно обновлены', 'ok');
        break;
      case false:
        stellarToast('Что-то пошло не так', 'error');
        break;
      default:
        break;
    }
  }, [changeUserDataSuccess]);



  return (
    <section className={styles.section}>
      <Toaster />
      <Form
        heading=''
        onSubmit={onSubmit}
        name='changeUserData'
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
            autoComplete='off'
          />
          {!hasUserNameError && <div className={styles.stub} />}
          <EmailInput
            onChange={onChangeEmail}
            onFocusCapture={onFocusEmail}
            onBlurCapture={onBlurEmail}
            value={email}
            autoComplete='off'
          />
          {!hasEmailError && <div className={styles.stub} />}
          <PasswordInput
            onChange={onChangePassword}
            onFocusCapture={onFocusPassword}
            onBlurCapture={onBlurPassword}
            value={password}
            /* данный атрибут предотвращает навязчивое АВТОЗАПОЛНЕНИЕ */
            autoComplete='new-password'
            placeholder='Новый пароль'
          />
          {!hasPasswordError && <div className={styles.stub} />}
        </EditZone>

        <ActionsZone className={styles.actionsZone}>
          {needButtons && <>
            <Button
              htmlType='reset'
              type='secondary'
              size='medium'
              disabled={wasChanged && !changeUserDataPending ? false : true}
              onClick={revertChanges}
            >
              Отмена
            </Button>
            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              disabled={!isFocus
                && userName.length > 1
                && !hasEmailError
                && email
                && !hasPasswordError
                && wasChanged
                && !changeUserDataPending
                ? false : true
              }
            >
              Сохранить
            </Button>
          </>}
        </ActionsZone>
      </Form>
    </section>
  )
}

export default User;
