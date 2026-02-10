import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const ServicesContext = createContext();

const ServicesProvider = ({ children }) => {
  const { token, userData } = useContext(UserContext);
  const navigate = useNavigate(); 

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Obtener servicios
  // -----------------------------
  const getServices = async (category = null) => {
    try {
      const url = category
        ? `${process.env.NEXT_PUBLIC_API_URL}/services?category=${category}`
        : `${process.env.NEXT_PUBLIC_API_URL}/services` ;

      const resp = await fetch(url);
      const data = await resp.json();
      setServices(data);
    } catch (error) {
      console.log("Error cargando servicios", error);
    }
  };

  // -----------------------------
  // Obtener categorías
  // -----------------------------
  const getCategories = async () => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await resp.json();
      setCategories(data);
    } catch (error) {
      console.log("Error cargando categorías", error);
    }
  };

  // -----------------------------
  // Crear servicio (mover desde UserContext)
  // -----------------------------
  const addService = async (e, service) => {
    e.preventDefault();

    try {
      const tokenStorage = localStorage.getItem("token");
      if (!tokenStorage) {
        alert("Debes iniciar sesión");
        return;
      }

      const servicioBackend = {
        titulo: service.titulo,
        foto: service.foto,
        descripcion: service.descripcion,
        precio: service.precio,
        categoria_id: service.categoria_id,
        usuario_id: userData.id,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicioBackend),
      });

      if (!res.ok) {
        alert("Error al agregar el servicio");
        return;
      }

      //const data = await res.json();
      alert("Servicio creado con éxito");
      navigate("/");

      //getServices(); // refrescar
    } catch (error) {
      console.error("Error creando servicio", error);
    }
  };

  // -----------------------------
  // Crear solicitud
  // -----------------------------
  const crearSolicitud = async (servicio_id) => {
    if (!userData?.id) {
      return { ok: false, error: "Debes iniciar sesión" };
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          servicio_id,
          usuario_id: userData.id,
          mensaje: "Nueva solicitud",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.message };
      }

      return { ok: true, id: data.id };
    } catch (error) {
      return { ok: false, error: "Error creando solicitud" };
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        categories,
        loading,
        getServices,
        getCategories,
        addService,
        crearSolicitud,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;

