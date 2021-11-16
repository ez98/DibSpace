import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from 'serpens/router'
import React from 'react';
export default function SpaceListItem(props) {
  return <div>
    <Link to={`/space/${props.id}?building=${props.building}&seats=${props.seats}&freeSeats=${props.freeSeats}&noise=${props.noise}&roomImage=${props.img_room}&buildImage=${props.img_build}`}>
      <ListGroup.Item className="mb-1">
        <Container>
          <Row>
            <Col>
              <h4>{props.building}</h4>
            </Col>
            {/* <Col>
              <p>{props.seats} seats</p>
            </Col> */}
            <Col>
              <p>{props.freeSeats} freeSeats</p>
            </Col>
            <Col>
              <p>Noise: {props.noise}</p>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </Link>
  </div>
}