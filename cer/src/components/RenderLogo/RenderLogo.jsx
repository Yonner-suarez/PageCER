import "./RenderLOgo.css";
import titulo from "../../assets/logoOficial.jpg";
import { Link } from "react-router-dom";

const RenderLogo = () => {
  return (
    <div className="contenedorLogo">
      <Link to="/home">
        <img src={titulo} alt="Logo" className="logo" />
      </Link>
    </div>
  );
};
export default RenderLogo;
