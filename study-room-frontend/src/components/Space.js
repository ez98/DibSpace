import { Container, Row } from "react-bootstrap";
import React from "react";
import { parse } from 'qs'
import SpaceInfo from "./SpaceInfo";
import ReserveSpace from "./ReserveSpace";
export default function Space(props) {
  const {location,match}=props
  const params = parse(location?.search, { ignoreQueryPrefix: true })
  const { params:{spaceId} } = match;
  return (
    <div>
      <Container>
        <Row>
          <SpaceInfo
            className="mb-3 ml-3"
            spaceId={spaceId}
            building={params.building}
            seats={params.seats}
            freeSeats={params.freeSeats}
            noise={params.noise}
            roomImage={params.roomImage}
          />
        </Row>
        <Row>
          <ReserveSpace spaceId={spaceId} className="mb-3" />
        </Row>
      </Container>
    </div>
  );
}
