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
              <h3>{props.building}</h3>
            </Col>
            <Col>
              <h6>{props.freeSeats} freeSeats</h6>
            </Col>
            <Col>
              <h6>Noise: {props.noise}</h6>
            </Col>
            <Col>
              <h6>Opens: {props.open_time}</h6>
            </Col>
            <Col>
              <h6>Closes: {props.close_time}</h6>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </Link>
  </div>
}