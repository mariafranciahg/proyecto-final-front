import { createContext, useState } from "react";
import { services } from "../data/services.js";

export const ServicesContext = createContext();

const ServicesProvider = ({ children }) => {
  const [servicesList, setServicesList] = useState([]);

  const getServices = () => {
    setServicesList(services);
  };

  const addService = (newService) => {
    setServicesList((prev) => [...prev, newService]);
  };

  return (
    <ServicesContext.Provider
      value={{ servicesList, getServices, addService }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
