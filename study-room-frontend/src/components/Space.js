import { Container } from "react-bootstrap";
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