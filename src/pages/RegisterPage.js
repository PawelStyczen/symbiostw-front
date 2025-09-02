import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../services/userService";
import { useAlert } from "../components/AlertContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const RegisterPage = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await registerUser(formData);
      if (response?.token) {
        login(response.token);
        showAlert("Registration successful!", "success");
        navigate("/dashboard");
      } else {
        showAlert("Registration successful! Please log in.", "success");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || "Failed to register. Please try again.";
      showAlert(errorMessage, "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <RegisterForm onRegister={handleRegister} />
              <Card.Text className="text-center mt-3">
                Already have an account?{" "}
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Log in here
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
