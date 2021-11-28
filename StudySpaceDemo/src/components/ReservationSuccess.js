import { useState } from "react"; 
import { Button, Container, Modal, Row} from "react-bootstrap"

export default function ReservationSuccess(props) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Modal
        show={props.show}
        onHide={handleClose}
        // backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Success! Space claimed.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Start Time: {props.start}</p>
          <p>End Time: {props.end}</p>
          <p>Scan the QR code at your study space to check in. </p>
          <p>Check in within 15 minutes of start time or claim will be cancelled.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}