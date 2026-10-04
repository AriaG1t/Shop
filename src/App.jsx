import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";

function App() {
  return (
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/items" element={<Items />}/>
        </Routes>
      </Layout>  
  )
}

export default App;
