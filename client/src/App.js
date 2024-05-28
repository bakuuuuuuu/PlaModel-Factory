import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Mypage from "./pages/mypage/Mypage";

function App() {
  const [canAccessChangePassword, setCanAccessChangePassword] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<List />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/findAccount"
          element={<FindAccount onFindAccount={() => setCanAccessChangePassword(true)} />}
        />
        <Route
          path="/changePassword"
          element={
            canAccessChangePassword ? <ChangePassword /> : <Navigate to="/findAccount" />
          }
        />
        <Route path = "/mypage" element = {<Mypage/>}/>
        <Route path = "/list" element = {<List/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;