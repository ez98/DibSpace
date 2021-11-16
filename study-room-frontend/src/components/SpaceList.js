import React from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import SpaceListItem from "./SpaceListItem";
import { connect } from "serpens";
import ImageCarousel from "./ImageCarousel";
@connect(({ global_room }) => ({
  spacesList: global_room.spacesList,
}))
export default class SpaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "global_room/fetchStudyspace",
    });
  }

  componentWillUnmount() {}

  render() {
    const { spacesList } = this.props;
    // const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"],
    // [2, "MTCC", 2, "high","mtcc-train.jpg"],
    // [3, "Rettaliata", 2, "mid", "rettaliata.jpg"]];
    return (
      <Container>
         <div>
        <h1>DibSpace</h1>
        <p>Find your place to study.</p>
      </div>
        <Row>
          <Col xl={12} xs={12}>
            <ImageCarousel />
          </Col>
        </Row>
        <Row>
          <h2>{this.props.listTitle}</h2>
        </Row>
        <Row style={{justifyContent: "space-around"}}>
          <ListGroup style={{width:'90%'}}>
            {/* {spaces.map((space) =>  <SpaceListItem key={space[0]} building={space[1]} id={space[0]} seats={space[2]} noise={space[3]} image={space[4]}/>)} */}

            {spacesList.map((space, index) => (
              <SpaceListItem
                key={index}
                building={space.building_name}
                id={space.id}
                seats={space.seats}
                freeSeats={space.free_seats}
                noise={space.noise}
                img_room={space.img_room}
                img_build={space.img_build}
              />
            ))}
          </ListGroup>
        </Row>
      </Container>
    );
  }
}
