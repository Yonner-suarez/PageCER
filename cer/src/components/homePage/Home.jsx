import Contacto from "../Contacto/Contacto";
import Footer from "../Footer/Footer";
import Carrousel from "../Corrusel/carrusel";
import NavBari from "../navBar/NavBar";
import Luk from "../Luk/Luk";
import logo from "../../assets/SoloLogo.svg";
import Valeo from "../valeo/Valeo";
import CarruselMarcas from "../CarruselMarcas/CarruselMarcas";
import Cofap from "../Cofap/Cofap";
import InfoNosotros from "../InfoNosotros/infoNosotros";
import Propuesta from "../Propuesta/Propuesta";
import RenderLogo from "../RenderLogo/RenderLogo";
import WhatsAppInfo from "../WhatsApp/WhatsApp";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "./sweetAlertStyles.css";
import "animate.css";
import { ThreeCircles } from "react-loader-spinner";

const Home = () => {
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");

  const showAlert = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Compra Exitosa Felicidades!",
    });
    return Toast;
  };

  if (status === "approved") {
    showAlert();
    // const newUrl = window.location.href.split("?")[0];
    // window.history.replaceState(null, "", newUrl);
  }

  useEffect(() => {
    const isAlertShown = localStorage.getItem("isAlertShown");

    if (isAlertShown !== "true") {
      Swal.fire({
        title: `Bienvenido a Casa Europea `,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__bounceInLeft",
        },
        imageUrl: `${logo}`,
        confirmButtonText: "¡A comprar!",
        customClass: {
          image: "custom-image-style",
          confirmButton: "custom-button-style",
        },
      });

      localStorage.setItem("isAlertShown", true);
    }
  }, []);

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
          {/* {aler ? alert("Bienvenido a CER") : console.log("ES FALSE")} */}
        </div>
      ) : (
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}
    </>
  );
};
export default Home;
