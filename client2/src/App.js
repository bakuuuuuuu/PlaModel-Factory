import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import List from "./pages/list/List";
import GundamList from "./pages/list/GundamList";
import BestProductList from "./pages/list/BestProductList";
import NewProductList from "./pages/list/NewProductList";
import DigimonList from "./pages/list/DigimonList";
import PokemonList from "./pages/list/PokemonList";
import HexaGearList from "./pages/list/HexaGearList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Mypage from "./pages/mypage/Mypage";
import Cart from "./pages/cart/Cart";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SearchResults from "./pages/list/SearchResults";
///수정수정수정

function App() {
  const [canAccessChangePassword, setCanAccessChangePassword] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<List />} />
        <Route path="/products/:id" element={<ProductDetail />} />
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
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>
          }
        />
        <Route path="/list" element={<List />} />
        <Route path="/bestProductList" element={<BestProductList/>}/>
        <Route path="/newProductList" element={<NewProductList/>}/>
        <Route path="/gundamList" element={<GundamList/>}/>
        <Route path="/digimonList" element={<DigimonList/>}/>
        <Route path="/pokemonList" element={<PokemonList/>}/>
        <Route path="/hexaGearList" element={<HexaGearList/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;