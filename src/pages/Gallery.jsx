import { useLocation } from "react-router-dom";
import { services } from "../data/services.js";
import CardServices from "../components/CardServices";

const Gallery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  
  const filteredServices = category
    ? services.filter(
        (service) => normalize(service.categoria) === normalize(category)
      )
    : services;
  
  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">
        {category ? `Servicios de ${category}` : "Todos los Servicios"}
      </h2>

      {filteredServices.length === 0 ? (
        <p>No hay servicios para esta categoría.</p>
      ) : (
        <div className="row g-4">
          {filteredServices.map((service) => (
            <div className="col-md-4" key={service.id}>
              <CardServices
                titulo={service.titulo}
                imagen={service.imagen}
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
