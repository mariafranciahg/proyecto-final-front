import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../components/Header";
import CardCategory from "../components/CardCategory";

import gasfiteriaIcon from "../assets/img/gasfiteria.png";
import herreriaIcon from "../assets/img/herreria.png";
import pinturaIcon from "../assets/img/pintura.png";
import electricidadIcon from "../assets/img/electricidad.png";
import limpiezaIcon from "../assets/img/limpieza.png";
import carpinteriaIcon from "../assets/img/carpinteria.png";

const Home = () => {
  return (
    <div className="services-background">
    
  
      <Header />

     
      <Container className="py-5">
      
        <h2 className="text-center fw-bold mb-4 text-secondary">Nuestros Servicios</h2>

        <Row className="g-4 ">
          <Col xs={12} md={4}>
            <CardCategory title="Gasfitería" icon={gasfiteriaIcon} />
          </Col>

          <Col xs={12} md={4}>
            <CardCategory title="Pintura" icon={pinturaIcon} />
          </Col>

          <Col xs={12} md={4}>
            <CardCategory title="Herrería" icon={herreriaIcon} />
          </Col>

          <Col xs={12} md={4}>
            <CardCategory title="Electricidad" icon={electricidadIcon} />
          </Col>

          <Col xs={12} md={4}>
            <CardCategory title="Limpieza" icon={limpiezaIcon} />
          </Col>

          <Col xs={12} md={4}>
            <CardCategory title="Carpintería" icon={carpinteriaIcon} />
          </Col>
        </Row>
        </Container>
      </div>
    
  );
};

export default Home;

