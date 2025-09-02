import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingById } from "../services/meetingService";
import { createPayUOrder } from "../services/payUService";
import { Container, Button, Spinner, Alert, Form } from "react-bootstrap";
import { useAlert } from "../components/AlertContext";
import LocationDetailsModal from "../components/LocationDetailsModal";
import TypeOfMeetingDetailsModal from "../components/TypeOfMeetingDetailsModal";

const JoinMeetingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const {
    data: meeting,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meeting", id],
    queryFn: () => fetchMeetingById(id),
    staleTime: 300000,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment") === "success") {
      showAlert("Payment successful! You have joined the meeting.", "success");
      navigate("/dashboard");
    }
  }, [navigate, showAlert]);

  const handlePayAndJoin = async () => {
    try {
      setLoadingPayment(true);

      const paymentUrl = await createPayUOrder(id, meeting.price);
      window.location.href = paymentUrl;
    } catch (error) {
      showAlert("Payment initialization failed.", "danger");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading meeting details...</p>
      </Container>
    );
  }

  if (error) {
    showAlert("Failed to load meeting details.", "danger");
    navigate("/home");
    return null;
  }

  return (
    <Container className="mt-5">
      <h1>Join Meeting</h1>
      {meeting && (
        <>
          <Alert variant="info">
            <p>
              <strong>{meeting.name}</strong>
            </p>
            <p>Instructor: {meeting.instructorName}</p>
            <p>
              Location:{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setShowLocationModal(true)}
              >
                {meeting.locationName}
              </Button>
            </p>
            <p>
              Type of Meeting:{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setShowTypeModal(true)}
              >
                {meeting.typeOfMeetingName}
              </Button>
            </p>
            <p>Date: {new Date(meeting.date).toLocaleString()}</p>
            <p>Price: {meeting.price} PLN</p>
          </Alert>
          <Form>
            <Button
              variant="primary"
              onClick={handlePayAndJoin}
              disabled={loadingPayment}
            >
              {loadingPayment ? "Processing Payment..." : "Proceed to Payment"}
            </Button>
          </Form>

          <LocationDetailsModal
            show={showLocationModal}
            onHide={() => setShowLocationModal(false)}
            locationId={meeting.locationId}
          />
          <TypeOfMeetingDetailsModal
            show={showTypeModal}
            onHide={() => setShowTypeModal(false)}
            typeOfMeetingId={meeting.typeOfMeetingId}
          />
        </>
      )}
    </Container>
  );
};

export default JoinMeetingPage;
