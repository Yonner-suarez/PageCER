import "./Card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Star, StarFill, Whatsapp } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { añadeCarrito } from "../../redux/slices/carrito";

const CardRep = ({
  id,
  imagen,
  nombre,
  precio,
  calificacion,
  marcaRep,
  marcas,
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(
      añadeCarrito(1, {
        id,
        imagen,
        nombre,
        precio,
        calificacion,
        marcaRep,
        marcas,
      })
    );
  };

  return (
    <>
      <Card
        key={id}
        style={{
          width: "30rem",
          height: "auto",
          margin: 5,
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
          textAlign: "left",
        }}
        className="Contenedorcard"
      >
        <Card.Img variant="top" src={imagen} className="imagenRep" />

        <Card.Body>
          {marcas.map((marca) => {
            return (
              <div key={marca.id}>
                <h2 className="subtitulo">{marca.marca}</h2>
              </div>
            );
          })}
          <Card.Title className="titulo">{nombre}</Card.Title>
          <Card.Text className="texto">${precio}</Card.Text>

          <Card.Text className="texto">{marcaRep.marcaRep}</Card.Text>
          <Card.Text className="texto">
            {calificacion === 0 ? <Star /> : <StarFill />}
          </Card.Text>
          <div className="botones">
            <Button
              variant="primary"
              style={{ fontFamily: "Franklin Gothic Medium" }}
              onClick={onClick}
            >
              Agregar
            </Button>

            <Link
              to="https://api.whatsapp.com/send?phone=573134421215&text=Buen_día_estoy_buscando_Repuestos"
              className="link"
            >
              <Whatsapp className="whatsapp" />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardRep;
