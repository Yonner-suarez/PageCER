import "./RenderLOgo.css";
import titulo from "../../assets/logoOficial.jpg";

const RenderLogo = () => {
  return (
    <div className="contenedorLogo">
      <a href="" className="link">
        <img src={titulo} alt="" className="logo" />
      </a>
    </div>
  );
};
export default RenderLogo;
