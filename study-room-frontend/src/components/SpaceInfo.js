import React from "react";
import { Card, Col, Container, Image, Row} from "react-bootstrap";
import { connect } from "serpens";

@connect()
export default class SpaceInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: [],
      seat: Number(props.seats)-Number(props.freeSeats),
      allSeats: Number(props.seats),
    };
  }

  componentDidMount=async ()=> {
    // const params =await parse(this.props.location.search, { ignoreQueryPrefix: true })
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
    this.props
    .dispatch({
      type: "reserve/fetReservationById",
      payload: { id: this.props.spaceId },
    })
    .then((res) => {
      const { allSeats, seat } = res;
      this.setState((state, props) => ({
        seat,
        allSeats,
        status: allSeats > seat ? "available" : "unavailable", // TODO: replace dummy data with data from database
      }));
    });
  }

  render() {
    // const {match:{params:{spaceId}}}=this.props;
    
    return (
      <Container>
        <Row>
          <Col span={12}>
            <Card className="mb-3">
              <Card.Img variant="top" src={this.props.roomImage} />
              <Card.Body>
                <Card.Title>Study Space Information</Card.Title>
                <Card.Text>
                  <p className="text-left">Space Id: {this.props.spaceId}</p>
                  <p className="text-left">Building: {this.props.building} </p>
                  <p className="text-left">AllSeats: {this.state.allSeats}</p>
                  <p className="text-left">FreeSeats: {this.state.allSeats-this.state.seat}</p>
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