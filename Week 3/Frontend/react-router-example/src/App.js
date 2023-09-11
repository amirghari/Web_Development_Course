import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Components/NotFound";
// import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import About from "../../useState-lab/src/Components/About";
import Contact from "./Components/Contact";
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
