import React from "react";
import { Button, Card, Col, Container, Form, Row} from "react-bootstrap"
import { variables } from '../Variables.js'


//we need to figure out how to pass in the space information that the user is choosing
//into this component. We need that information since once we click on Submit
//we can send a http POST request to our server, so that the reserveration can be logged and displayed to the user

export default class ReserveSpace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.spaceId,
      date: "",
      startHour: "",
      startMinute: "",
      startAmPm: "",
      durationHour: "",
      durationMinute: "",
      studentID: []
    }
  }

  componentDidMount() {
    this.refreshList();
  }
  
  parseData(data){
    var lst = [];
    for(var i = 0; i < data.length; i++){
      lst.push(data[i].student_id)
    }
    return lst;
  }
  
  refreshList(){
    fetch(variables.API_URL + 'student')
    .then(response => response.json())
    .then(data => {
      this.setState({studentID:this.parseData(data)})
    });
  }

  getEndTime(hour, min, durationHour, durationMin, amPM){ //fix this function so that it handles when a user chooses 12PM and duration is an hour or greater. Must go to 1PM not 13PM. 
    var hourTotal = hour + durationHour;
    var minTotal = 0;

    if(min + durationMin === 60){ //means that the minutes from the chosen reservation time and the minutes from the duration time equal an hour. Therefore, add an hour to hourTotal
      hourTotal += 1;
    }
    else if(min + durationMin > 60){ //same as above, except that now that we calculate new minute total if sum goes over 60. 
      hourTotal += 1;
      minTotal = (min + durationMin) - 60;
    }
    else{
      minTotal = min + durationMin; //otherwise, just add them
    }
    if (minTotal === 0){ // this if statement is just to handle when minTotal is 0. For formatting reasons basically. Added an extra 0.
      return hourTotal.toString() + ":" + minTotal.toString() + "0" + amPM;
    }
    return hourTotal.toString() + ":" + minTotal.toString() + amPM;
  }

  postReservation(){
    fetch(variables.API_URL+'reservation',{
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        reservation_id: Math.floor(Math.random() * 90 + 10).toString(), //generation a random two digit number
        student_id: this.state.studentID[Math.floor(Math.random() * this.state.studentID.length)], //choosing a random student ID from the DB. This needs to be fixed in such a way that the student ID from the student submitting the reservation is filled in here.
        study_space_id: "SS" + "-" + Math.floor(Math.random() * 90 + 10).toString(), //have to figure out how to pass in the current space id present on the web app when the user presses submit. For now, generating a random space ID.
        //the study space ID can be retrieved if we let the user choose a space ID from their choice of building. Once they choose a space ID, we pass it in here.
        start_time: this.state.startHour + ":" + this.state.startMinute + " " + this.state.startAmPm,
        end_time: this.getEndTime(Number(this.state.startHour), Number(this.state.startMinute), Number(this.state.durationHour), Number(this.state.durationMinute), this.state.startAmPm) //calculate end time with the getEndTime function
      })
    })
    .then(res=>res.json())
    .then((result) =>{
      alert(result + 
            "\nBuilding: " + this.props.spaceId + 
            "\nStart Time: " + this.state.startHour + ":" + this.state.startMinute + " " + this.state.startAmPm +
            "\nEnd Time: " + this.getEndTime(Number(this.state.startHour), Number(this.state.startMinute), Number(this.state.durationHour), Number(this.state.durationMinute), this.state.startAmPm)
            );
      this.refreshList( );
    },(error) =>{
      alert(error);
    })
  }

  handleChange = (event) => {
    this.state = {
      ...this.state,
      [event.target.name]: event.target.value
    }
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mb-3">
              <Row><Card.Title>Reserve This Space</Card.Title></Row>
              <Row>
                <Col>
                  <Card.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} className="">Start Time</Form.Label>
                      <Col>
                        <Row>
                          <Col xs={4} md={3} lg={2}>
                          <Form.Group className="mb-3">
                            <Form.Label>Hour</Form.Label>
                            <Form.Select name="startHour" onChange={this.handleChange}>
                              <option>12</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                            </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col xs={4} md={3} lg={2}>
                              <Form.Group className="mb-3">
                                <Form.Label>Minute</Form.Label>
                                <Form.Select name="startMinute" onChange={this.handleChange}>
                                  <option>00</option>
                                  <option>15</option>
                                  <option>30</option>
                                  <option>45</option>
                                </Form.Select>
                              </Form.Group>
                          </Col>
                          <Col xs={4} md={3} lg={2}>
                            <Form.Group className="mb-3">
                              <Form.Label>AM/PM</Form.Label>
                              <Form.Select name="startAmPm" onChange={this.handleChange}>
                                <option>AM</option>
                                <option>PM</option>
                              </Form.Select>
                              </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                        
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3} className="">Study Session Length</Form.Label>
                        <Col xs={4} md={3} lg={2}>
                          <Form.Group className="mb-3">
                            <Form.Label>Hours</Form.Label>
                            <Form.Select name="durationHour" onChange={this.handleChange}>
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      <Col xs={4} md={3} lg={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>Minutes</Form.Label>
                          <Form.Select name="durationMinute" onChange={this.handleChange}>
                            <option>00</option>
                            <option>15</option>
                            <option>30</option>
                            <option>45</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Button variant="primary" type="submit" onClick={()=>this.postReservation()}>
                        Submit
                      </Button>
                    </Form.Group>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
