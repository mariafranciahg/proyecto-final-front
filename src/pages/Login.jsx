import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function Login() {
  const { login, email, pass, setEmail, setPass } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPass(value);
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center py-5 my-5 ">
      <Card
        className="shadow p-5 txt-secondary"
        style={{ width: "400px", height: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>

        <Form onSubmit={login}>
          
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={pass}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2 btn-servi ">
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

