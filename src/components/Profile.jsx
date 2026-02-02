import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { userData, logout } = useContext(UserContext);

  if (!userData.nombre) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Card className="p-4 shadow" style={{ width: "380px" }}>
        <div className="text-center mb-3">
          {userData.foto && (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(userData.foto)}`}
              alt="Avatar"
              className="rounded-circle mb-2"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <h4 className="fw-bold">{userData.nombre}</h4>
          <p className="text-muted">{userData.email}</p>
        </div>
        <Button className="w-100" variant="danger" onClick={logout}>
          Cerrar sesión
        </Button>
      </Card>
    </div>
  );
}

export default Profile;

