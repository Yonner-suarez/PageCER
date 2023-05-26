import "./RepuestosPeugeot.css";

import CardRep from "../Card/Card";

const RepuestosPeugeot = () => {
  return (
    <div className="contenedorRepuestos">
      <CardRep
        nombre="Vw gol 1.6 1.8 02/..."
        id={1000}
        imagen="https://i.ebayimg.com/thumbs/images/g/b80AAOSw5P5gkmC5/s-l300.jpg"
        calificacion="0"
        marcaRep={{ id: 78, luk: "luk" }}
        key={"1000"}
        precio="120.000"
        marcas={[{ marca: "peugeot", id: "2000" }]}
      />
    </div>
  );
};

export default RepuestosPeugeot;
