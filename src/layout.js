import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import Home from "./pages/home";
import Acciones from "./pages/acciones";
import Informes from "./pages/informes";
import Usuarios from "./pages/usuarios"

import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Layout = () => {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Acciones />} path="/Acciones" />
          <Route element={<Informes />} path="/Informes" />
          <Route element={<Usuarios />} path="/Usuarios" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
};

export default injectContext(Layout);
