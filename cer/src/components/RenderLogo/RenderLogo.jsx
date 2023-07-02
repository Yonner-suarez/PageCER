import "./RenderLOgo.css";
import titulo from "../../assets/logoOficial.jpg";
import { Link } from "react-router-dom";
//import Button from "react-bootstrap/Button";

const RenderLogo = () => {
  // const onClick = () => {
  //   loginWithRedirect();
  // };

  return (
    <div className="contenedorLogo">
      <Link to="/" className="linklogo">
        <img src={titulo} alt="Logo" className="logo" />
      </Link>
      {/* <Button variant="dark" className="login" onClick={onClick}>
        Log In
      </Button> */}
    </div>
  );
};
export default RenderLogo;
