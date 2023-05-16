import "./RepuestosRenault.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const RepuestosRenault = () => {
  return (
    <div className="contenedorRepuestos">
      <Card style={{ width: "20rem", margin: 5 }}>
        <Card.Img
          variant="top"
          src="https://i.ebayimg.com/thumbs/images/g/b80AAOSw5P5gkmC5/s-l300.jpg"
        />
        <Card.Body>
          <Card.Title>Kit mebrague</Card.Title>
          <Card.Text>
            Vw gol 1.6 1.8 02/... <br />
            Precio: 120.000
          </Card.Text>
          <Button variant="primary">Comprar</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default RepuestosRenault;
