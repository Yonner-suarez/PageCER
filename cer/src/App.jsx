import "./App.css";
import Logocer from "./assets/Logo.svg";
import Carrousel from "./components/Corrusel/carrusel";
import NavBari from "./components/navBar/NavBar";
import Luk from "./components/InfoDeEmpresa/Luk";
import InfoLuk from "./components/InfoLuk/InfoLuk";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="contenedorApp">
      <a href="">
        <img src={Logocer} alt="" className="logo" />
      </a>
      <NavBari />
      <Carrousel />
      <Luk />
      <InfoLuk />
    </div>
  );
}

export default App;
