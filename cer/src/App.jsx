import "./App.css";
import Logocer from "./assets/Logo.svg";
import Carrousel from "./components/Corrusel/carrusel";
import NavBari from "./components/navBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <a href="">
        <img src={Logocer} alt="" className="logo" />
      </a>
      <NavBari />
      <Carrousel />
    </div>
  );
}

export default App;
