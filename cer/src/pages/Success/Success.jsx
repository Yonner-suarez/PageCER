import { useEffect } from "react";
import style from "./Success.module.css";
import { useDispatch } from "react-redux";
import { vaciarCarritoSucces } from "../../redux/slices/carrito";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(vaciarCarritoSucces());
  }, [dispatch]);

  return <div className={style.contenedorSuccess}>Success</div>;
};

export default Success;
