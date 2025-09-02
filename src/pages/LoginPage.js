import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col, Card } from "react-bootstrap";
import { loginUser } from "../services/userService";
import { useAlert } from "../components/AlertContext";
import { useErrorNotification } from "../hooks/useErrorNotification";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../components/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useErrorNotification({ isError, error, showAlert });

  const queryClient = useQueryClient();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    try {
      setIsError(false);
      setError(null);

      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");

      const data = await loginUser(email, password);

      login(data.token);

      showAlert("Login successful!", "success");

      queryClient.invalidateQueries(["currentUser"]);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data || { message: "Invalid email or password" }
      );
      setIsError(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <LoginForm onLogin={handleLogin} />
              <Card.Text className="text-center mt-3">
                Don't have an account?{" "}
                <a
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Register here
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
