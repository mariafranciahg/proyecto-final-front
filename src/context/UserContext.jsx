import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState(""); 
  const [pass, setPass] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) setToken(tokenStorage);
  }, []);

  const getProfile = async () => {
    const tokenStorage = localStorage.getItem("token");
    if (!tokenStorage) return;

    try {
      const res = await fetch("http://localhost:3000/profile", {
        headers: { "Authorization": `Bearer ${tokenStorage}` },
      });
      const data = await res.json();
      if (data.nombre) setUserData(data);
    } catch (err) {
      console.error("Error obteniendo perfil", err);
    }
  };

  useEffect(() => {
    if (token) getProfile();
  }, [token]);


  const register = async (e, form) => {
    e.preventDefault(); 

    try {
      // Generamos avatar
      const nuevoUsuario = {
        ...form,
        foto: createAvatar(lorelei, { seed: form.nombre }).toString(),
      };
      

      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!res.ok) {
        alert("Error al registrar usuario");
        return;
      }

      await res.json();
      alert("Registro exitoso");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error registrando usuario");
    }
  };

  const login = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!res.ok) {
        alert("Credenciales incorrectas o error en el login");
        return;
      }

      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        const perfilResp = await fetch("http://localhost:3000/profile", {
          headers: { "Authorization": `Bearer ${data.token}` },
        });
        const perfilData = await perfilResp.json();
        setUserData(perfilData);

        navigate("/profile");
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error(err);
      alert("Error en login");
    }
  };

  const addService = async (e, service) => {
    e.preventDefault(); 
  
    try {
      const tokenStorage = localStorage.getItem("token");
      if (!tokenStorage) return alert("Debes iniciar sesión");
  
      // Mapeamos los campos al backend
      const servicioBackend = {
        titulo: service.title,
        precio: service.price,
        descripcion: service.description,
        foto: service.image,
        usuario_id: userData.id,           
        categoria_id: service.category,    
      };
  
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage}`,
        },
        body: JSON.stringify(servicioBackend),
      });
  
      if (!res.ok) {
        const err = await res.json();
        return alert(err.error || "Error creando el servicio");
      }
  
      await res.json();
      alert("Servicio creado con éxito");
  
    } catch (err) {
      console.error(err);
      alert("Error conectando con el servidor");
    }
  };
  
  
  const logout = () => {
    setToken("");
    setUserData({});
    setEmail("");
    setPass("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userData,
        email,
        pass,
        setEmail,
        setPass,
        getProfile,
        register,
        login,
        logout,
        addService,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
