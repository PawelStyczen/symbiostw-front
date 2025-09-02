import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMeetingById,
  removeParticipantFromMeeting,
} from "../services/meetingService";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useAlert } from "../components/AlertContext";
import LocationDetailsModal from "../components/LocationDetailsModal";

const LeaveMeetingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const {
    data: meeting,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meeting", id],
    queryFn: () => fetchMeetingById(id),
    staleTime: 300000,
  });

  const handleLeaveMeeting = async () => {
    try {
      await removeParticipantFromMeeting(id);
      showAlert("Successfully left the meeting.", "info");
      queryClient.invalidateQueries(["calendarData"]);
      queryClient.invalidateQueries(["userMeetings"]);
      navigate("/home");
    } catch (error) {
      showAlert("Failed to leave the meeting.", "danger");
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

  return (
    <Container className="mt-5">
      <h1>Leave Meeting</h1>
      {meeting && (
        <>
          <Alert variant="warning">
            <p>{meeting.name}</p>
            <p>
              Location:{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setSelectedLocationId(meeting.locationId);
                  setShowLocationModal(true);
                }}
              >
                {meeting.locationName}
              </Button>
            </p>
          </Alert>

          <Button variant="danger" onClick={handleLeaveMeeting}>
            Leave Meeting
          </Button>

          <LocationDetailsModal
            show={showLocationModal}
            onHide={() => setShowLocationModal(false)}
            locationId={selectedLocationId}
          />
        </>
      )}
    </Container>
  );
};

export default LeaveMeetingPage;
