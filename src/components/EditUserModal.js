import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateCurrentUser } from "../services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../components/AlertContext";

const EditUserModal = ({ show, onHide, user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    city: user?.city || "",
    street: user?.street || "",
  });

  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      showAlert("User info updated successfully!", "success");
      onHide();
    },
    onError: () => {
      showAlert("Failed to update user info.", "danger");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {};
    if (formData.name !== user.name) updatedData.name = formData.name;
    if (formData.surname !== user.surname)
      updatedData.surname = formData.surname;
    if (formData.city !== user.city) updatedData.city = formData.city;
    if (formData.street !== user.street) updatedData.street = formData.street;

    if (Object.keys(updatedData).length === 0) {
      showAlert("No changes detected.", "info");
      return;
    }

    mutation.mutate(updatedData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
