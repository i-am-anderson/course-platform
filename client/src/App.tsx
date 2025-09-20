import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import Exam from "./pages/Exam";
import Module from "./pages/Module";
import useSidenavContext from "./contexts/SidenavContext";

function App() {
     const { sidenav } = useSidenavContext();

  return (
    <BrowserRouter>
      <main>
        <Header />
        <section className="section" data-toggle={sidenav}>
          <Sidenav />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/introducao-e-conceitos-fundamentais" element={<Module />} />
              <Route path="/planejamento-da-playlist" element={<Module />} />
              <Route path="/organizacao-e-estetica" element={<Module />} />
              <Route path="/compartilhamento-e-engajamento" element={<Module />} />
              <Route path="/exame" element={<Exam />} />
            </Routes>
          </div>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
