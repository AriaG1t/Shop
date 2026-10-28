import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminProduct from "./pages/AdminProduct/AdminProduct";
import AdminCreate from "./pages/AminCreate/AdminCreate";

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
        <Route element={<PrivateRoute requiredRole="admin"/>}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/product/:id" element={<AdminProduct />} />
          <Route path="/admin/create" element={<AdminCreate />} />
        </Route>
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Layout>
  )
}

export default App;
