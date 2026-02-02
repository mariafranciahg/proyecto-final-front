import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CreateService() {
  const { addService } = useContext(UserContext);

  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState(""); 
  const [categoria, setCategoria] = useState(""); 

  const handleSubmit = (e) => {
    const nuevoServicio = {
      title: titulo,
      price: precio,
      description: descripcion,
      image: imagenUrl,
      category: categoria, 
    };

    addService(e, nuevoServicio);

    // limpiar formulario
    setTitulo("");
    setPrecio("");
    setDescripcion("");
    setImagenUrl(""); 
    setCategoria(""); 
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Crear Publicación</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título del servicio"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Descripción del servicio"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="1">Limpieza</option>
              <option value="2">Gasfitería</option>
              <option value="3">Herrería</option>
              <option value="4">Electricidad</option>
              <option value="5">Carpintería</option>
              <option value="6">Pintura</option>
            </Form.Control>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Publicar
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default CreateService;
