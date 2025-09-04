import React from "react";
import { Modal, Spinner, Button, Image, Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { fetchInstructorById } from "../services/instructorService";
import { StyledModal, StyledButton } from "./StyledComponents";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialLinks"; // <- make sure this path is correct

// tiny helper to fix backslashes and ensure protocol
const normalizeUrl = (raw) => {
  if (!raw) return "";
  let u = raw.replace(/\\/g, "/");
  if (!/^https?:\/\//i.test(u)) u = "https://" + u.replace(/^\/+/, "");
  return u;
};

const InstructorDetailsModal = ({ show, onHide, instructorId, instructor }) => {
  const {
    data: fetchedInstructor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["instructor", instructorId],
    queryFn: () => fetchInstructorById(instructorId),
    enabled: !!instructorId && show && !instructor,
    staleTime: 300000,
  });

  const navigate = useNavigate();
  const finalInstructor = instructor || fetchedInstructor;

  if (isLoading && !instructor) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" />
          <p>Loading instructor details...</p>
        </Modal.Body>
      </StyledModal>
    );
  }

  if (error) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Alert variant="danger">Failed to load instructor details.</Alert>
        </Modal.Body>
      </StyledModal>
    );
  }

  const facebookUrl = normalizeUrl(finalInstructor?.facebookLink);
  const instagramUrl = normalizeUrl(finalInstructor?.instagramLink);
  const tiktokUrl = normalizeUrl(finalInstructor?.tikTokLink);

  const anySocial =
    (!!finalInstructor?.facebookLink &&
      !!facebookUrl &&
      facebookUrl.startsWith("http")) ||
    (!!finalInstructor?.instagramLink &&
      !!instagramUrl &&
      instagramUrl.startsWith("http")) ||
    (!!finalInstructor?.tikTokLink &&
      !!tiktokUrl &&
      tiktokUrl.startsWith("http"));

  return (
    <StyledModal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {finalInstructor?.name
            ? `${finalInstructor.name} ${finalInstructor?.surname ?? ""}`.trim()
            : "Instructor Details"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {finalInstructor?.imageUrl && (
          <div className="text-center mb-3">
            <Image
              src={`${process.env.REACT_APP_API_URL}/${finalInstructor.imageUrl}`}
              alt={finalInstructor.name}
              fluid
              style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
            />
          </div>
        )}

        {/* Bio as HTML (already sanitized/controlled on the backend side) */}
        {finalInstructor?.bio && (
          <div dangerouslySetInnerHTML={{ __html: finalInstructor.bio }} />
        )}

        {/* Social links (icons) */}
        {anySocial && (
          <div className="mt-3">
            <strong>Znajdziesz mnie tutaj: </strong>
            <div className="mt-2">
              <SocialLinks
                facebookUrl={
                  finalInstructor?.facebookLink ? facebookUrl : undefined
                }
                instagramUrl={
                  finalInstructor?.instagramLink ? instagramUrl : undefined
                }
                tiktokUrl={finalInstructor?.tikTokLink ? tiktokUrl : undefined}
              />
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <StyledButton
          variant="secondary"
          onClick={() =>
            navigate("/schedule", {
              state: { instructorName: finalInstructor?.name },
            })
          }
        >
          Znajdź spotkania
        </StyledButton>
        <StyledButton variant="secondary" onClick={onHide}>
          Close
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default InstructorDetailsModal;
