import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { checkUserAuth } from "../../services/middlewares/authActions";

import HomePage from "../../pages/home";
import LayoutHeader from "../LayoutHeader/LayoutHeader";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import User from "../Profile/User/User";
import Orders from "../Profile/Orders/Orders";
import LogOut from "../Profile/LogOut/LogOut";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import NotFound404Page from "../../pages/not-found-404";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutHeader />} >
          <Route index element={<HomePage />} />

          <Route path='login' element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path='register' element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path='forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path='reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

          {/* <Route path='ingredient/:id' element={<IngredientPage />} /> */}

          <Route path='profile' element={<OnlyAuth component={<ProfilePage />} />} >
            <Route index element={<User />} />
            <Route path='orders' element={<Orders />} />
            <Route path='logout' element={<LogOut />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
