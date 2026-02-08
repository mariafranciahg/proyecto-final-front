import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CardServices = ({ id, titulo, imagen, descripcion, precio }) => {
  return (
    <Card className="shadow-sm border-0 h-100 service-card txt-secondary ">
      <Card.Img variant="top" src={imagen} alt={titulo} style={{ height: "200px", objectFit: "cover", width: "100%" }} />

      <Card.Body>
        <Card.Title className="fw-bold ">{titulo}</Card.Title>
        <Card.Text className="">{descripcion}</Card.Text>

        <p className="fw-semibold mb-3">
          Precio: ${precio}
        </p>

        <Link to={`/service/${id}`}>
          <Button className="w-100 btn-servi">
            Ver detalle
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardServices;

