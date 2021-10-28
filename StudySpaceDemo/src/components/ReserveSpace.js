import React from "react";
import { Button, Card, Col, Container, Form, Row} from "react-bootstrap"


//we need to figure out how to pass in the space information that the user is choosing
//into this component. We need that information since once we click on Submit
//we can send a http POST request to our server, so that the reserveration can be logged and displayed to the user.


export default class ReserveSpace extends React.Component {


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     status: []
  //   };
  // }

  // refreshList(){
  //   fetch(variables.API_URL + 'studyspace')
  //   .then(response => response.json())
  //   .then(data => {
  //     this.setState({status: data[0]['status']})
  //   })
  // }

  // componentDidMount() {
  //   // call updateStatus method every 2 seconds
  //   this.refreshList();
  // }


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
                      <Form>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3} className="">Date</Form.Label>
                          <Col xs={6} sm={5} md={4} lg={3} xl={2}>
                            <Form.Control type="date"></Form.Control>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm={3} className="">Start Time</Form.Label>
                          <Col>
                            <Row>
                              <Col xs={4} md={3} lg={2}>
                              <Form.Group className="mb-3">
                                <Form.Label>Hour</Form.Label>
                                <Form.Select>
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
                                    <Form.Select>
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
                                  <Form.Select>
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
                                <Form.Select>
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          <Col xs={4} md={3} lg={2}>
                            <Form.Group className="mb-3">
                              <Form.Label>Minutes</Form.Label>
                              <Form.Select>
                                <option>00</option>
                                <option>15</option>
                                <option>30</option>
                                <option>45</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form.Group>
                      </Form>
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