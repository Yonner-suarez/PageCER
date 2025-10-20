import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "../../Helpers/api";
import { pedidosAPI } from "../../Helpers/url";
import style from "./PagoResultado.module.css";
import { handleError } from "../../Helpers/functions";
import Footer from "../../components/Footer/Footer";

function PagoResultado() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const partes = reference.split("_"); // ["PEDIDO", "19"]
  const idPedidoParams = partes[1];
  const [loading, setLoading] = useState(true);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  useEffect(() => {
    const validarPago = async () => {
      try {
        if (!idPedidoParams) return;

        const res = await api.get(
          pedidosAPI.VALIDARPAGO.replace("{idPedido}", idPedidoParams)
        );

        if (res.status === 200 && res.data?.data === 1) {
          setPagoExitoso(true);
          Swal.fire(
            "¡Pago exitoso!",
            res.data.message || "El pago fue exitoso",
            "success"
          );
        } else {
          setPagoExitoso(false);
          Swal.fire(
            "Atención",
            res.data.message || "No se ha hecho ningún pago.",
            "warning"
          );
        }
      } catch (error) {
        handleError(error);
        setPagoExitoso(false);
      } finally {
        setLoading(false);
      }
    };

    validarPago();
  }, [idPedidoParams]);

  if (loading) {
    return (
      <>
        <div className={style.contenedorLoading}>
          <p className={style.loading}>Procesando pago...</p>
          <Link to="/" className={style.btnHome}>
            Volver al Inicio
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return pagoExitoso ? (
    <div className={style.contenedorSuccess}>
      <CheckCircle size={80} color="green" />
      <h2>¡Tu pago fue exitoso!</h2>
      <p>
        Gracias por tu compra. Tu pedido #{idPedidoParams} ha sido confirmado.
      </p>
      <Link to="/" className={style.btnHome}>
        Volver al Inicio
      </Link>
      <Footer />
    </div>
  ) : (
    <div className={style.contenedorFailure}>
      <div className={style.card}>
        <XCircle className={style.icon} color="#721c24" />
        <h2>Pago no procesado</h2>
        <p>
          Lamentablemente no pudimos completar tu pago. Por favor, revisa tu
          método de pago o inténtalo nuevamente.
        </p>
        <div className={style.actions}>
          <Link to="/" className={style.btnRetry}>
            Reintentar Pago
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PagoResultado;
