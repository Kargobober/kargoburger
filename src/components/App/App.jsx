import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import LayoutHeader from "../LayoutHeader/LayoutHeader";
import LoginPage from "../../pages/login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutHeader />} >
          <Route index element={<HomePage />} />

          <Route path='login' element={<LoginPage />} />
          {/* <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />

          <Route path='ingredient/:id' element={<IngredientPage />} />

          <Route path='profile' element={<ProfilePage />} /> */}
        </Route>

        {/* <Route path='*' element={<NotFound404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
