import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/middlewares/authActions";
import { getAuthPending, getUserFromState } from "../../services/selectors/authSelector";
import { colorInterfaceAccent } from "../../utils/constants";
import { MoonLoader } from "react-spinners";

const Protected = ({ onlyUnAuth = false, component }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const authPending = useSelector(getAuthPending);
  const user = useSelector(getUserFromState);

  if (authPending) {
    // Запрос еще выполняется
    return (
      <MoonLoader
          color={colorInterfaceAccent}
          size={120}
          cssOverride={{
            marginTop: '120px',
          }}
          speedMultiplier={0.4}
        />
    );
  }

  if (onlyUnAuth && (user === null ? false : (user.email && user.name))) {
    console.log('onlyUnAuth', onlyUnAuth);
    console.log('user', user);
    console.log('ПЕРЕНАПРАВКА!!!!');
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('пук-пук');
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user
  console.log('по-ум');
  return component;
};

export const OnlyAuth = (props) => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth = (props) => <Protected onlyUnAuth={true} {...props} />;
