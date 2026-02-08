import { useState, useContext } from "react";
import { ServicesContext } from "../context/ServicesContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserContext } from "../context/UserContext";

function CreateService() {
  const { addService } = useContext(ServicesContext);
  const { userData } = useContext(UserContext);
  
  const [service, setService] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    foto: "",
    categoria_id: "1",
  });

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  if (userData === null) return <p className="text-center mt-5">Cargando...</p>;


  if (!userData.id) {
    return <p className="text-center mt-5">Debes iniciar sesión</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Card className="p-4 shadow txt-secondary" style={{ width: "450px" }}>
        <h3 className="fw-bold text-center mb-4">Crear publicación</h3>

        <Form onSubmit={(e) => addService(e, service)}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={service.titulo}
              onChange={handleChange}
              placeholder="Ej: Limpieza profunda"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={service.descripcion}
              onChange={handleChange}
              placeholder="Describe tu servicio"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={service.precio}
              onChange={handleChange}
              placeholder="Ej: 25000"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de imagen</Form.Label>
            <Form.Control
              type="text"
              name="foto"
              value={service.foto}
              onChange={handleChange}
              placeholder="Opcional"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria_id"
              value={service.categoria_id}
              onChange={handleChange}
            >
              <option value="1">Electricidad</option>
              <option value="2">Limpieza</option>
              <option value="3">Gasfitería</option>
              <option value="4">Herrería</option>
              <option value="5">Carpintería</option>
              <option value="6">Pintura</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mt-2 btn-servi ">
            Publicar servicio
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default CreateService;
