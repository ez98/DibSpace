import { Container, ListGroup, Row } from "react-bootstrap";
import SpaceListItem from "./SpaceListItem";

export default function SpaceList(props) {
  const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"], 
                  [2, "MTCC", 2, "high","mtcc-train.jpg"], 
                  [3, "Rettaliata", 2, "mid", "rettaliata.jpg"]];

    return <div>
      <Container>
        <Row>
          <h2>{props.listTitle}</h2>
        </Row>
        <Row>
          <ListGroup>
            {spaces.map((space) =>  <SpaceListItem key={space[0]} building={space[1]} id={space[0]} seats={space[2]} noise={space[3]} image={space[4]}/>)}
          </ListGroup>
        </Row>
      </Container>
    </div>
}
