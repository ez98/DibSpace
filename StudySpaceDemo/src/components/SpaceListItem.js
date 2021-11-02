import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SpaceListItem(props) {

  return <div>
    <Link to={`/space/${props.id}?building=${props.building}&seats=${props.seats}&noise=${props.noise}&image=${props.image}`} className="link">
      <ListGroup.Item className="mb-1">
        <Container>
          <Row>
            <Col>
              <h4>{props.building}</h4>
            </Col>
            <Col>
              <p>{props.seats} seats</p>
            </Col>
            <Col>
              <p>Noise: {props.noise}</p>
            </Col>
            <Col>
              <p>Opens: {props.opens}</p>
            </Col>
            <Col>
              <p>Closes: {props.closes}</p>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </Link>
  </div>
}