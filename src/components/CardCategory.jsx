import { useNavigate } from "react-router-dom"; 
import Card from "react-bootstrap/Card";

const CardCategory = ({ id, title, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gallery?category=${id}`);
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

