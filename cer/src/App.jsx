import "./App.css";
import RenderLogo from "./components/RenderLogo/RenderLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/homePage/Home";

function App() {
  return (
    <div>
      <RenderLogo />
      <Home />
    </div>
  );
}

export default App;
