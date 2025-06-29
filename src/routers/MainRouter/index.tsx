import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Categories from "../../pages/Categories";

import About from "../../pages/About";
import NotFound from "../../pages/NotFound";
import Transaction from "../../pages/Trasaction";

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}