import { useEffect } from "react";
import style from "./Success.module.css";
import { useDispatch } from "react-redux";
import { vaciarCarritoSucces } from "../../redux/slices/carrito";
import { Asterisk } from "react-bootstrap-icons";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(vaciarCarritoSucces());
  }, [dispatch]);

  return (
    <div className={style.contenedorDosElementos}>
      <div className={style.contenedorSuccess}>
        <h1 className={style.envio}>Detalles del envio</h1>
        <hr className={style.hr} />
        <div className={style.contenedorNombres}>
          <div className={style.formularioDeEvnio}>
            {/* <div className={style.contenedorNombres}> */}
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Nombre{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Apellidos{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Pais{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Departamento{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Ciudad{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Dirección{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Información adicional dirección{" "}
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Código postal{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Telefono{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
          <div className={style.formularioDeEvnio}>
            <input type="text" required className={style.input} />
            <label className={style.label}>
              <span className={style.span}>
                Correo electronico{" "}
                <Asterisk
                  style={{ width: "6px", color: "red", marginTop: "-8px" }}
                />
              </span>
            </label>
          </div>
        </div>

        {/* <h1 className={style.envio}>info adicional</h1>
        <hr className={style.hr} />
        <div className={style.formularioDeEvnio}>
          <label>
            <textarea type="text" />
          </label>
        </div> */}
      </div>
      <div className={style.imagenes}>imagen</div>
    </div>
  );
};

export default Success;
