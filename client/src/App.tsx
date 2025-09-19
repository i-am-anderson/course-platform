import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import Exam from "./pages/Exam";
import Module from "./pages/Module";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <section className="section">
          <Sidenav />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/modulo-1-primeiros-passos" element={<Module />} />
              <Route path="/modulo-2-configuracoes-iniciais" element={<Module />} />
              <Route path="/modulo-3-playlist" element={<Module />} />
              <Route path="/checkpoint-exame" element={<Exam />} />
            </Routes>
          </div>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
