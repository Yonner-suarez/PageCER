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

const Home = () => {
  return (
    <div>
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
};
export default Home;
