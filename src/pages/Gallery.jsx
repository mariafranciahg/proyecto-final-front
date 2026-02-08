import { useContext, useEffect } from "react";
import { ServicesContext } from "../context/ServicesContext";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CardServices from "../components/CardServices";

const Gallery = () => {
  const { services, categories, getServices, getCategories } =
    useContext(ServicesContext);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // Cargar servicios + categorías
  useEffect(() => {
    getServices(category);
    getCategories();
  }, [category]);

  // Nombre de categoría (si está filtrado y hay servicios)
  const categoryName =
    category && services.length > 0 ? services[0].categoria_nombre : null;

  // Cambiar categoría desde el select
  const handleCategoryChange = (e) => {
    const selected = e.target.value;

    if (selected === "all") {
      navigate("/gallery");
    } else {
      navigate(`/gallery?category=${selected}`);
    }
  };

  return (
    <div className="container py-4">

      {/* TÍTULO */}
      <h2 className="fw-bold mb-4">
        {category ? `Servicios de ${categoryName}` : "Todos los Servicios"}
      </h2>

      {/* SELECT DE FILTRO */}
      <div className="mb-4" style={{ maxWidth: "300px" }}>
        <Form.Select
          value={category || "all"}
          onChange={handleCategoryChange}
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* LISTA DE SERVICIOS */}
      {services.length === 0 ? (
        <p>No hay servicios para esta categoría.</p>
      ) : (
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-4" key={service.id}>
              <CardServices
                id={service.id}   
                titulo={service.titulo}
                imagen={service.foto}
                descripcion={service.descripcion}
                precio={service.precio}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
