import { BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/home"
import Demo from "./pages/demo/demo";

export default function Layout() {
  return (
    <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
  )
}
