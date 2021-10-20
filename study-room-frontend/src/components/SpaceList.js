import { Container, ListGroup, Row } from "react-bootstrap";
import SpaceListItem from "./SpaceListItem";

export default function SpaceList(props) {
  const spaces = [[1, "Galvin Library"], [2, "MTCC"], [3, "Rettaliata"]];

    return <div>
      <Container>
        <Row>
          <h2>{props.listTitle}</h2>
        </Row>
        <Row>
          <ListGroup>
            {spaces.map((space) =>  <SpaceListItem key={space[0]} title={space[1]} id={space[0]}/>)}
          </ListGroup>
        </Row>
      </Container>
    </div>
}
