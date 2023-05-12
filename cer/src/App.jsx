import "./App.css";
import titulo from "./assets/titulo.svg";
import Carrousel from "./components/Corrusel/carrusel";
import NavBari from "./components/navBar/NavBar";
import Luk from "./components/Luk/Luk";
import InfoNosotros from "./components/InfoNosotros/infoNosotros";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <InfoNosotros />
      <InfoNosotros />
      <InfoNosotros />
      <InfoNosotros />
    </div>
  );
}

export default App;
