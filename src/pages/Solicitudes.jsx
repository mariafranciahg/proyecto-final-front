import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Tabs, Tab, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const Solicitudes = () => {
  const { token } = useContext(UserContext);

  const [misSolicitudes, setMisSolicitudes] = useState([]);
  const [recibidas, setRecibidas] = useState([]);
  const [error, setError] = useState(null);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // Cargar solicitudes realizadas y recibidas
  const fetchSolicitudes = async () => {
    try {
      const res1 = await fetch("http://localhost:3000/solicitudes/realizadas", { headers });
      const res2 = await fetch("http://localhost:3000/solicitudes/recibidas", { headers });

      setMisSolicitudes(await res1.json());
      setRecibidas(await res2.json());
    } catch (err) {
      alert("No se pudieron cargar las solicitudes."); // alerta de error
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Cancelar solicitud creada por el usuario
  const cancelarSolicitud = async (id) => {
    try {
      await fetch(`http://localhost:3000/solicitudes/${id}`, {
        method: "DELETE",
        headers,
      });

      alert("Solicitud cancelada correctamente."); // ventana emergente
      fetchSolicitudes(); // refrescar lista
    } catch (err) {
      alert("Error al cancelar la solicitud."); // ventana emergente
    }
  };

  // Cambiar estado (Aceptar / Rechazar)
  const cambiarEstado = async (id, estado) => {
    try {
      await fetch(`http://localhost:3000/solicitudes/estado/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ estado }),
      });

      alert(`Solicitud ${estado}.`); // ventana emergente
      fetchSolicitudes(); // refrescar lista
    } catch (err) {
      alert("Error al actualizar la solicitud."); // ventana emergente
    }
  };

  return (
    <Container className="py-5 txt-secondary">
      <h2 className="fw-bold text-center mb-4">Mis solicitudes</h2>

      <Tabs defaultActiveKey="mias" className="mb-3 tabs-servi">

        {/* TAB 1: SOLICITUDES CREADAS */}
        
        <Tab eventKey="mias" title="Creadas por mí">
          <Row>
            {misSolicitudes.length === 0 && (
              <Card className="p-3 shadow-sm mb-3 ">
                <p className="text-center text-muted mb-0 txt-secondary">No has creado solicitudes.</p>
              </Card>
            )}

            {misSolicitudes.map((s) => (
              <Col md={6} className="mb-3" key={s.id}>
                <Card className="p-3 shadow-sm txt-secondary">
                  <h5 className="fw-bold">{s.servicio_titulo}</h5>
                  <p className="text-muted">{s.mensaje}</p>
                  <p><strong>Estado:</strong> {s.estado}</p>
                  <p><strong>Fecha:</strong> {new Date(s.fecha_creacion).toLocaleString()}</p>

                  <Button
                    className="btn-servi-secondary w-50"
                    size="sm"
                    onClick={() => cancelarSolicitud(s.id)}
                  >
                    Cancelar solicitud
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* TAB 2: SOLICITUDES RECIBIDAS */}
        <Tab eventKey="recibidas" title="Solicitudes recibidas">
          <Row>
            {recibidas.length === 0 && (
              <Card className="p-3 shadow-sm mb-3">
                <p className="text-center text-muted mb-0">No tienes solicitudes recibidas.</p>
              </Card>
            )}

            {recibidas.map((s) => (
              <Col md={6} className="mb-3" key={s.id}>
                <Card className="p-3 shadow-sm txt-secondary">
                  <h5 className="fw-bold">{s.servicio_titulo}</h5>
                  <p><strong>Solicitante:</strong> {s.solicitante}</p>
                  <p className="text-muted">{s.mensaje}</p>
                  <p><strong>Estado:</strong> {s.estado}</p>
                  <p><strong>Fecha:</strong> {new Date(s.fecha_creacion).toLocaleString()}</p>

                  <div className="d-flex gap-2 mt-2">
                    <Button
                      className="btn-servi"
                      size="sm"
                      onClick={() => cambiarEstado(s.id, "Aceptada")}
                    >
                      Aceptar
                    </Button>

                    <Button
                      className="btn-servi-secondary"
                      size="sm"
                      onClick={() => cambiarEstado(s.id, "Rechazada")}
                    >
                      Rechazar
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

      </Tabs>
    </Container>
  );
};

export default Solicitudes;
