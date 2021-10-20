import { Container , Row} from "react-bootstrap";
import { useParams } from "react-router";
import SpaceListItem from "./SpaceListItem";

export default function Space(props) {

  const { spaceId } = useParams();

  return <div>
    <Container>
      <Row>
        <p>Space Id: {spaceId}</p>
      </Row>
    </Container>
  </div>
}