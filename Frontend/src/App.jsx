import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { SignupPage } from "./pages/SignupPage";
import { ViewPage } from "./pages/ViewPage";

const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;