import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { ServicesContext } from "../context/ServicesContext";

const Service = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const { services, getServices, crearSolicitud } = useContext(ServicesContext);

  const [solicitudCreada, setSolicitudCreada] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar servicios si aún no están
  useEffect(() => {
    if (services.length === 0) {
      getServices();
    } else {
      setLoading(false);
    }
  }, [services]);

  useEffect(() => {
    if (services.length > 0) setLoading(false);
  }, [services]);

  if (loading) return <div>Cargando...</div>;

  const servicioActual = services.find((s) => s.id === Number(id));
  if (!servicioActual) return <div>Servicio no encontrado</div>;

  // 🚀 Crear solicitud usando ServicesContext
  const handleCrearSolicitud = async () => {
    if (!userData?.id) {
      setError("Debes iniciar sesión para crear una solicitud.");
      return;
    }

    const result = await crearSolicitud(servicioActual.id);

    if (result.ok) {
      setSolicitudCreada(result.id);
      setError(null);
    } else {
      setError(result.error || "Error al crear la solicitud");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow p-3">
            <Row>
              <Col md={5}>
                <Card.Img
                  variant="top"
                  src={servicioActual.foto || "https://via.placeholder.com/300"}
                  style={{ height: "300px", objectFit: "cover", borderRadius: "12px" }}
                />
              </Col>

              <Col md={7}>
                <Card.Body>
                  <Card.Title className="fw-bold fs-3 text-capitalize">
                    {servicioActual.titulo}
                  </Card.Title>

                  <Card.Text className="text-muted">
                    {servicioActual.descripcion}
                  </Card.Text>

                  <Card.Text>
                    <strong>Categoría:</strong> {servicioActual.categoria_nombre}
                  </Card.Text>

                  <Card.Text className="fs-5 fw-bold">
                    Precio: ${Number(servicioActual.precio).toLocaleString()}
                  </Card.Text>

                  <Button
                    variant="primary"
                    className="mt-2 w-100"
                    onClick={handleCrearSolicitud}
                  >
                    Crear solicitud
                  </Button>

                  {solicitudCreada && (
                    <Alert variant="success" className="mt-3">
                      Solicitud creada correctamente.  
                      <strong> Número solicitud: {solicitudCreada}</strong>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Service;
