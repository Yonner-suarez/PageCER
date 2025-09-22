import Contacto from "../../components/Contacto/Contacto";
import Footer from "../../components/Footer/Footer";
import Carrousel from "../../components/Corrusel/carrusel";
import NavBari from "../../components/navBar/NavBar";
import Luk from "../../components/Luk/Luk";
import logo from "../../assets/SoloLogo.svg";
import Valeo from "../../components/valeo/Valeo";
import CarruselMarcas from "../../components/CarruselMarcas/CarruselMarcas";
import Cofap from "../../components/Cofap/Cofap";
import InfoNosotros from "../../components/InfoNosotros/infoNosotros";
import Propuesta from "../../components/Propuesta/Propuesta";
import RenderLogo from "../../components/RenderLogo/RenderLogo";
import WhatsAppInfo from "../../components/WhatsApp/WhatsApp";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./sweetAlertStyles.css";
import "animate.css";
import { ThreeCircles } from "react-loader-spinner";
import LoginModal from "../../components/LoginModal/LoginModal";

const Home = () => {
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [moduloCliente, setModuloCliente] = useState(false);

  const handleClose = () => setShowModal(false);

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
          <RenderLogo
            setShowModal={setShowModal}
            setShowAdmin={setShowAdmin}
            moduloCliente={moduloCliente}
          />
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
          // ...inside the return statement of your RenderLogo component
          <LoginModal
            show={showModal}
            handleClose={handleClose}
            showAdmin={showAdmin}
            setModuloCliente={setModuloCliente}
          />
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
