import React, { useEffect, useMemo, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledForm, StyledModal } from "./StyledComponents";
import { registerGuestForMeeting } from "../services/meetingService";
import { useAlert } from "./AlertContext";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
  allowNewsletter: false,
  allowSmsMarketing: false,
};

const GuestMeetingRegistrationModal = ({
  show,
  onHide,
  meetingId,
  meetingTitle,
}) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setFormData(initialFormData);
    setErrorMessage("");
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const helperText = useMemo(() => {
    if (!meetingTitle) {
      return "Zgłoszenie zostanie dodane jako oczekujące na akceptację.";
    }

    return `Zgłoszenie na wydarzenie "${meetingTitle}" zostanie dodane jako oczekujące na akceptację.`;
  }, [meetingTitle]);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      const normalizedPhoneNumber = formData.phoneNumber.trim();

      await registerGuestForMeeting(meetingId, {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        email: formData.email.trim(),
        phoneNumber: normalizedPhoneNumber || null,
        allowNewsletter: formData.allowNewsletter,
        allowSmsMarketing: formData.allowSmsMarketing,
      });

      showAlert(
        "Zgłoszenie zostało wysłane. Poczekaj na akceptację administratora.",
        "success",
      );
      onHide();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("Już wysłano zgłoszenie na to wydarzenie.");
        return;
      }

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Nie udało się wysłać zgłoszenia.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneConsentsSelected = formData.allowSmsMarketing;

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Zgłoszenie gościa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-4">{helperText}</p>

        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="guest-registration-name">
            <Form.Label>Imię</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="guest-registration-surname">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="guest-registration-email">
            <Form.Label>Adres e-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={255}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="guest-registration-phone">
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required={phoneConsentsSelected}
              maxLength={32}
              placeholder={
                phoneConsentsSelected
                  ? "Wymagany dla zaznaczonych zgód"
                  : "Opcjonalnie"
              }
              inputMode="tel"
              autoComplete="tel"
            />
            <Form.Text muted>
              Opcjonalnie. Możemy go użyć tylko do kontaktu organizacyjnego w
              sprawie tego wydarzenia. Jeśli zaznaczysz zgodę na newsletter SMS,
              numer będzie wymagany.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2" controlId="guest-registration-news">
            <Form.Check
              type="checkbox"
              name="allowNewsletter"
              checked={formData.allowNewsletter}
              onChange={handleChange}
              label="Chcę otrzymywać newsletter e-mail"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="guest-registration-sms">
            <Form.Check
              type="checkbox"
              name="allowSmsMarketing"
              checked={formData.allowSmsMarketing}
              onChange={handleChange}
              label="Chcę otrzymywać newsletter i informacje marketingowe SMS"
            />
          </Form.Group>

          <div className="d-flex flex-wrap gap-2 justify-content-end mt-4">
            <StyledButton
              type="button"
              variant="secondary"
              onClick={onHide}
              disabled={isSubmitting}
            >
              Anuluj
            </StyledButton>
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </StyledButton>
          </div>
        </StyledForm>
      </Modal.Body>
    </StyledModal>
  );
};

export default GuestMeetingRegistrationModal;
