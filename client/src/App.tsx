import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/styles.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidenav />
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
