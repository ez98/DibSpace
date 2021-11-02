import React from "react";
import { Card, Col, Container, Image, Row} from "react-bootstrap";

export default class SpaceInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: []
    };
  }

  componentDidMount() {
    // call updateStatus method every 2 seconds
    this.statusTimer = setInterval(
      () => this.updateStatus(),
      2000
    )
  }

  componentWillUnmount() {
    clearInterval(this.statusTimer) // stop checking status
  }

  updateStatus() {
    // TODO: read the space's availability status data from the database.
    //  - probably use this.props.id
    this.setState((state, props) => ({
      status: "available" // TODO: replace dummy data with data from database
    }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={5}>
          <Image className="mb-3" src={require(`../imgs/${this.props.image}`).default} rounded fluid/>
          </Col>
          <Col lg={7}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Study Space Information</Card.Title>
                <Card.Text>
                  <p className="text-left">Space Id: {this.props.spaceId}</p>
                  <p className="text-left">Building: {this.props.building} </p>
                  <p className="text-left">Seats: {this.props.seats}</p>
                  <p className="text-left">Noise: {this.props.noise}</p>
                  <p className="text-left">Status: {this.state.status}</p> 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}