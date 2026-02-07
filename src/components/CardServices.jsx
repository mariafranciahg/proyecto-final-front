import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CardServices = ({ id, titulo, imagen, descripcion, precio }) => {
  return (
    <Card className="shadow-sm border-0 h-100 service-card">
      <Card.Img variant="top" src={imagen} alt={titulo} />

      <Card.Body>
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        <p className="fw-semibold text-success mb-3">
          Precio: ${precio}
        </p>

        <Link to={`/service/${id}`}>
          <Button variant="primary" className="w-100">
            Ver detalle
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardServices;

