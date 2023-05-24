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

const Home = () => {
  return (
    <>
      {<Carrousel /> ? (
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
      ) : (
        <img
          src="https://codigofuente.io/wp-content/uploads/2018/09/progress.gif"
          alt=""
        />
      )}
    </>
  );
};
export default Home;
