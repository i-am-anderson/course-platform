import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import Exam from "./pages/Exam";

function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <Sidenav />
        <section>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
