import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
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
      

      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
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

        const perfilResp = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
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
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
