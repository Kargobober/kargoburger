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

          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />

          {/* <Route path='ingredient/:id' element={<IngredientPage />} /> */}

          <Route path='profile' element={<ProfilePage />} >
            <Route index element={<User />} />
            <Route path='orders' element={<Orders />} />
            <Route path='logout' element={<LogOut />} />
          </Route>
        </Route>

        {/* <Route path='*' element={<NotFound404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
