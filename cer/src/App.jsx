import "./App.css";
import RenderLogo from "./components/RenderLogo/RenderLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/homePage/Home";
import WhatsAppInfo from "./components/WhatsApp/WhatsApp";

function App() {
  return (
    <div>
      <RenderLogo />
      <Home />
      <WhatsAppInfo />
    </div>
  );
}

export default App;
