import "./App.css";
import titulo from "./assets/titulo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/homePage/Home";

function App() {
  return (
    <div className="contenedorApp">
      <a href="" className="link">
        <img src={titulo} alt="" className="logo" />
      </a>
      <Home />
    </div>
  );
}

export default App;
