import React, { useState } from "react";
import { StyledForm, StyledButton } from "./StyledComponents";
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledForm.Group className="mb-3" controlId="formEmail">
        <StyledForm.Label>Email address</StyledForm.Label>
        <StyledForm.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </StyledForm.Group>
      <StyledForm.Group className="mb-3" controlId="formPassword">
        <StyledForm.Label>Password</StyledForm.Label>
        <StyledForm.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </StyledForm.Group>
      <StyledButton variant="primary" type="submit" className="w-100">
        Login
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
