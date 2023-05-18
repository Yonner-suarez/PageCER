import "./Card.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardRep = ({
  id,
  imagen,
  nombre,
  precio,
  calificacion,
  marcaRep,
  marcas,
}) => {
  return (
    <>
      <Card
        style={{
          width: "20rem",
          margin: 5,
          display: "inline-flex",
          position: "relative",
        }}
      >
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          {marcas.map((marca) => {
            return (
              <div key={marca.id}>
                <h2>{marca.marca}</h2>
              </div>
            );
          })}
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>${precio}</Card.Text>
          <Card.Text>{calificacion}</Card.Text>
          <Card.Text>{marcaRep.marcaRep}</Card.Text>

          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardRep;
