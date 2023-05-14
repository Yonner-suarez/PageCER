import "./App.css";
import titulo from "./assets/titulo.svg";
import Carrousel from "./components/Corrusel/carrusel";
import NavBari from "./components/navBar/NavBar";
import Luk from "./components/Luk/Luk";
import Valeo from "./components/valeo/Valeo";
import CarruselMarcas from "./components/CarruselMarcas/CarruselMarcas";
import Cofap from "./components/Cofap/Cofap";
import InfoNosotros from "./components/InfoNosotros/infoNosotros";
import Propuesta from "./components/Propuesta/Propuesta";
import "bootstrap/dist/css/bootstrap.min.css";
import Contacto from "./components/Contacto/Contacto";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="contenedorApp">
      <a href="">
        <img src={titulo} alt="" className="logo" />
      </a>
      <NavBari />
      <Carrousel />
      <InfoNosotros />
      <Luk />
      <Valeo />
      <Cofap />
      <CarruselMarcas />
      <Propuesta />
      <Contacto />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
