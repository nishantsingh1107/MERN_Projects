import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { SignupPage } from "./pages/SignupPage";
import { ViewPage } from "./pages/ViewPage";
import { useMyContext } from "./context/MyContext";

const App = () =>{
  const {user, appLoading} = useMyContext();
  if(appLoading){
    return(
      <div className="min-h-[100vh] flex items-center content-center">
        <div className="text-black text-5xl">Loading...</div>
      </div>
    )
  }

  const {isAuthenticated} = user;
  if(!isAuthenticated){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }


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