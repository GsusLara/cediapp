import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import Home from "./pages/home";
import Demo from "./pages/demo/demo";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Demo />} path="/demo" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
};

export default injectContext(Layout);
