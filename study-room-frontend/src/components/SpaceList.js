import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import SpaceListItem from "./SpaceListItem";

export default class SpaceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: []
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render() {

    const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"], 
                    [2, "MTCC", 2, "high","mtcc-train.jpg"], 
                    [3, "Rettaliata", 2, "mid", "rettaliata.jpg"]];

    return (
      <Container>
        <Row>
          <h2>{this.props.listTitle}</h2>
        </Row>
        <Row>
          <ListGroup>
            {spaces.map((space) =>  <SpaceListItem key={space[0]} building={space[1]} id={space[0]} seats={space[2]} noise={space[3]} image={space[4]}/>)}
          </ListGroup>
        </Row>
      </Container>
    )
  }
}
