import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "../components/AlertContext";
import { Container } from "react-bootstrap";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  }, [navigate, location, showAlert]);

  return (
    <Container className="text-center" style={{ marginTop: "20rem" }}>
      {" "}
      <h1>Payment successfull</h1>
    </Container>
  );
};

export default PaymentSuccessPage;
