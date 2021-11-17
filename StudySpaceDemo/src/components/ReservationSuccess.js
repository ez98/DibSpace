import { Container, Row} from "react-bootstrap"

export default function ReservationSuccess(props) {

  
  
  return <div>
    <Container>
      <Row>
        <h2>Success! This reservation has been saved.</h2>
        <p>Scan the QR code to check in on {props.date} at {props.time}</p>
        
      </Row>

    </Container>
  </div>
}