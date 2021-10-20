import { Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SpaceListItem(props) {

  return <div>
    <Link to={`/space/${props.id}`}>
      <ListGroup.Item>
        {props.title}
      </ListGroup.Item>
    </Link>
  </div>
}