import React, { useState } from "react";
import { StyledForm, StyledButton } from "./StyledComponents";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    city: "",
    street: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Name</StyledForm.Label>
        <StyledForm.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Surname</StyledForm.Label>
        <StyledForm.Control
          type="text"
          placeholder="Enter surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>City</StyledForm.Label>
        <StyledForm.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Street</StyledForm.Label>
        <StyledForm.Control
          type="text"
          placeholder="Enter street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Email address</StyledForm.Label>
        <StyledForm.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Password</StyledForm.Label>
        <StyledForm.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledForm.Group className="mb-3">
        <StyledForm.Label>Confirm Password</StyledForm.Label>
        <StyledForm.Control
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </StyledForm.Group>

      <StyledButton variant="primary" type="submit" className="w-100">
        Register
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
