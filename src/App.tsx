import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutComponent from './components/Layout';
import About from './pages/About';
import Home from './pages/Home';

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
