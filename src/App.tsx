import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Something from "./pages/Something";
import SomethingElse from "./pages/SomethingElse";
import Footer from "./components/Footer";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/something" element={<Something />} />
        <Route path="/something-else" element={<SomethingElse />} />
      </Routes>
      <Footer />
    </>
  );
}
