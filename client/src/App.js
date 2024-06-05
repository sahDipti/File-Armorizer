import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import DisplayPage from "./pages/DisplayPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
