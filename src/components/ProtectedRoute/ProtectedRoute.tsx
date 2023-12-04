import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/middlewares/authActions";
import { getAuthPending, getUserFromState } from "../../services/selectors/authSelector";
import { colorInterfaceAccent } from "../../utils/constants";
import { MoonLoader } from "react-spinners";

type TProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: TProps) => {
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
          // не получилось передать переменной
          color='#4c4cff'
          size={120}
          cssOverride={{
            marginTop: '120px',
          }}
          speedMultiplier={0.4}
        />
    );
  }

  if (onlyUnAuth && (user === null ? false : (user.email && user.name))) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user
  return component;
};

export const OnlyAuth = ({component}: {component: JSX.Element}) => <Protected onlyUnAuth={false} component={component} />;
export const OnlyUnAuth = ({component}: {component: JSX.Element}) => <Protected onlyUnAuth={true} component={component} />;
