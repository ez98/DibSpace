import { ListGroup } from "react-bootstrap";

function StudyList(props) {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>  <ListGroup.Item>{number}</ListGroup.Item>);

    return <div>
      <h2>{props.listTitle}</h2>
      <ListGroup>
        {listItems}
      </ListGroup>
    </div>
}

export default StudyList;