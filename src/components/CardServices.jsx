import Card from "react-bootstrap/Card";

const CardServices = ({ titulo, imagen, descripcion, precio }) => {
  return (
    <Card className="shadow-sm border-0 h-100 service-card">
      <Card.Img variant="top" src={imagen} alt={titulo} />

      <Card.Body>
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        <p className="fw-semibold text-success mb-0">
          Precio: ${precio}
        </p>
      </Card.Body>
    </Card>
  );
};

export default CardServices;
