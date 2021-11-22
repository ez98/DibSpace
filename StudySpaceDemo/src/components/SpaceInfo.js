import React from "react";
import { Card, Col, Container, Image, Row} from "react-bootstrap";
import {variables} from '../Variables.js'

export default class SpaceInfo extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      spaceid: [],
      table: [],
      status: []
    };
  }

  //the reason I am picking random data here is because I don't know which study rooms are in which 
  //buildings yet.
  //It would be better if a user can choose a building, then all study spaces that are inside that
  //building will be displayed to a user in rows.
  //Code will look something like this:
  //    User picks building
  //    A new page is displayed where the user chooses the room they would like to study in
  //    Once picking the room, a function runs given the room_id
  //    the room_id is used to filter out the study spaces available in the room
  //    Once we get the study spaces in the room, we display it to the user to choose
  //    This is the page that should look like the one in the front end demo
  //    It should display the 'study space info' and 'reserve this space' boxes
  refreshList(){
    const i = Math.floor(Math.random() * 4);
    fetch(variables.API_URL + 'studyspace')
    .then(response => response.json())
    .then(data => {
      this.setState({spaceid:data[i]['study_space_id']});
      this.setState({table:data[i]['table']});
      this.setState({status:data[i]['status']});
    });
  }


  componentDidMount() {
    this.refreshList();
  }

  componentWillUnmount() {
    clearInterval(this.statusTimer) // stop checking status
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
                {/* is it possible to do a map function here and then choose a study space available? */}
                <Card.Text>
                  <p className="text-left">Space Id: {this.state.spaceid}</p>
                  <p className="text-left">Building: {this.props.building} </p>
                  <p className="text-left">Table: {this.state.table === true ? 'true' : 'false'}</p>
                  <p className="text-left">Seats: {this.props.seats}</p>
                  <p className="text-left">Noise: {this.props.noise}</p>
                  {/* <p className="text-left">Status: {this.state.status}</p>  */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
