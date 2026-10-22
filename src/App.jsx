import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Layout>
  )
}

export default App;
