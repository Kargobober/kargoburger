import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
// если использовать стандартный диспатч, то TS не будет ругаться на вызов labuda()
// import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import * as THistory from 'history';

import { checkUserAuth } from "../../services/middlewares/authActions";
import { clearInfo } from "../../services/slices/ingredientDetailsSlice";

import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import HomePage from "../../pages/home";
import Layout from "../Layout/Layout";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import User from "../Profile/User/User";
import Orders from "../Profile/Orders/Orders";
import LogOutPage from "../Profile/LogOut/LogOutPage";
import NotFound404Page from "../../pages/not-found-404";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import IngredientPage from "../../pages/ingredient";


function App (): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // const labuda = () => {};

  /* в текущей позиции истории (location) в стейте (state) в поле background записывается
    весь location предыдущей точки истории, потому тип  THistory.Location */
  const historyState = location.state as { background?: THistory.Location} | null;

  useEffect(() => {
    dispatch(checkUserAuth());
    // dispatch(labuda());
  }, []);

  return (
    <>
      <Routes location={historyState?.background || location}>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />

          <Route path='login' element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path='register' element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path='forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path='reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

          <Route path='ingredients/:id' element={<IngredientPage />} />

          <Route path='profile' element={<OnlyAuth component={<ProfilePage />} />} >
            <Route index element={<User />} />
            <Route path='orders' element={<Orders />} />
            <Route path='logout' element={<LogOutPage />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound404Page />} />
      </Routes>

      {historyState?.background && (
        <Routes>
          <Route path='ingredients/:id' element={
            <Modal heading='Детали ингредиента'
              onClose={() => {
                dispatch(clearInfo());
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }/>
        </Routes>
      )}
    </>
  );
}

export default App;
