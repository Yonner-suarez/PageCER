import Contacto from "../Contacto/Contacto";
import Footer from "../Footer/Footer";
import Carrousel from "../Corrusel/carrusel";
import NavBari from "../navBar/NavBar";
import Luk from "../Luk/Luk";
import Valeo from "../valeo/Valeo";
import CarruselMarcas from "../CarruselMarcas/CarruselMarcas";
import Cofap from "../Cofap/Cofap";
import InfoNosotros from "../InfoNosotros/infoNosotros";
import Propuesta from "../Propuesta/Propuesta";
import RenderLogo from "../RenderLogo/RenderLogo";
import WhatsAppInfo from "../WhatsApp/WhatsApp";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    axios
      .get("/repuesto")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div>
      <RenderLogo />
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
      <WhatsAppInfo />
    </div>
  );
};
export default Home;
