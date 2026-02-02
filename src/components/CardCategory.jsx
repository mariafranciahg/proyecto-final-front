import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

const CardCategory = ({ title, icon }) => {
  const navigate = useNavigate();

  // Convertir el title a formato compatible con tu data
  const normalizeCategory = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")               // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .replace(/\s+/g, "");            // elimina espacios si los hubiera

  const handleClick = () => {
    navigate(`/gallery?category=${normalizeCategory(title)}`);
  };

  return (
    <Card
      className="shadow-sm border-0 text-center service-card text-secondary"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <img 
          src={icon} 
          alt={title} 
          style={{ width: "60px", marginBottom: "15px" }}
        />
        <Card.Title className="fw-bold">{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CardCategory;
