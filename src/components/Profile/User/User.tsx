import { useState, useEffect } from 'react';
import Form from '../../Form/Form';
import { Toaster } from 'react-hot-toast';
import EditZone from '../../Form/EditZone/EditZone';
import ActionsZone from '../../Form/ActionsZone/ActionsZone';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './User.module.css';
import { useLocation } from 'react-router';
import { getChangeUserDataPending, getChangeUserDataSuccess, getUserState, getUserSuccess } from '../../../services/selectors/authSelector';
import { changeUserData } from '../../../services/middlewares/authQueries';
import { stellarToast } from '../../../utils/utils';
import { TUser } from '../../../utils/api';

function User(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const user = useSelector(getUserState) as TUser | null;
  const userSuccess = useSelector(getUserSuccess) as boolean;
  const changeUserDataPending = useSelector(getChangeUserDataPending) as boolean;
  const changeUserDataSuccess = useSelector(getChangeUserDataSuccess) as boolean | null;

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const emailRegExp = /\../;

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const [needButtons, setNeedButtons] = useState(false);



  const onChangeUserName: React.ChangeEventHandler<HTMLInputElement> = e => {
    setUserName(e.target.value);
  };
  const onFocusUserName = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasUserNameError(false);
    setIsFocus(true);
  };
  const onBlurUserName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) setHasUserNameError(true);
    setIsFocus(false);
  };



  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const onFocusEmail: React.ChangeEventHandler<HTMLInputElement> = e => {
    setHasEmailError(false);
    setIsFocus(true);
  };
  const onBlurEmail: React.ChangeEventHandler<HTMLInputElement> = e => {
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


  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value);
    setWasChanged(true);
  };
  const onFocusPassword: React.ChangeEventHandler<HTMLInputElement> = e => {
    setHasPasswordError(false);
    setIsFocus(true);
  };
  const onBlurPassword: React.ChangeEventHandler<HTMLInputElement> = e => {
    setHasPasswordError((e.target.value.length > 5) ? false : (e.target.value.length > 0) ? true : false);
    setIsFocus(false);
  };

// КНОПКИ
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(changeUserData({ name: userName, email, password }));
  };
  const revertChanges = () => {
    if (user && user.name && user.email) {
      setUserName(user.name);
      setEmail(user.email);
      setPassword('');
      setWasChanged(false);
    }
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
