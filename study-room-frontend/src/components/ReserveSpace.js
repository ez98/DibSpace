import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "serpens";
import moment from "moment";
import { notification } from "antd";
import { DatePicker, TimePicker } from "antd";
import { routerRedux } from "serpens/router";
import { stringify } from "qs";

@connect()
export default class ReserveSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceId: props.spaceId,
      reserveDate: moment().format("YYYY-MM-DD"),
      reserveHour: 1,
      reserveMinute: "00",
      studyHour: 1,
      studyMinutes: "00",
    };
  }

  componentDidMount() {
    // call updateStatus method every 2 seconds
    // this.statusTimer = setInterval(() => this.updateStatus(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.statusTimer); // stop checking status
  }

  updateStatus() {
    // TODO: read the space's availability status data from the database.
    //  - probably use this.props.id
  }
  disabledDate = (current) => {
    return current && current < moment().startOf("d");
  };
  disabledTime = (current) => {
    const hourList = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ];
    return hourList.slice(0, Number(moment().get("h")));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mb-3">
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Title>Reserve This Space</Card.Title>
                    <Form>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          column
                          sm={3}
                          className="mb-3"
                          controlId="FormOfDate"
                        >
                          Date
                        </Form.Label>
                        <Col xs={8} sm={6} md={5} lg={4} xl={3}>
                          <DatePicker
                            style={{ width: "100%" }}
                            disabledDate={this.disabledDate}
                            onChange={(val) => {
                              if (val) {
                                this.setState({
                                  reserveDate: moment(val).format("YYYY-MM-DD"),
                                });
                              }
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className="">
                          Start Time
                        </Form.Label>
                        <Col xs={8} sm={6} md={5} lg={4} xl={3}>
                          <TimePicker
                            style={{ width: "100%" }}
                            disabledHours={this.disabledTime}
                            onChange={(val) => {
                              if (val) {
                                const reserveHour = val.get("h");
                                const reserveMinute = val.get("minute");
                                this.setState({
                                  reserveHour,
                                  reserveMinute,
                                });
                              }
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className="">
                          Study Session Length
                        </Form.Label>
                        <Col lg={4} xs={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Hours</Form.Label>
                            <Form.Select
                              value={this.state.studyHour}
                              onChange={(val) => {
                                this.setState({
                                  studyHour: val.target.value,
                                });
                              }}
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg={4} xs={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Minutes</Form.Label>
                            <Form.Select
                              value={this.state.studyMinutes}
                              onChange={(val) => {
                                this.setState({
                                  studyMinutes: val.target.value,
                                });
                              }}
                            >
                              <option>00</option>
                              <option>15</option>
                              <option>30</option>
                              <option>45</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          variant="primary"
                          onClick={async () => {
                            const start_time = `${this.state.reserveDate} ${this.state.reserveHour}:${this.state.reserveMinute}:00`;
                            const end_time = moment(start_time)
                              .add(this.state.studyHour, "hours")
                              .add(this.state.studyMinutes, "minutes");
                            if (end_time - moment() > 0) {
                              await this.props.dispatch({
                                type: "reserve/save",
                                payload: {
                                  reserveForm: this.state,
                                },
                              });
                              this.props
                                .dispatch({
                                  type: "reserve/setReserveInfo",
                                })
                                .then((res) => {
                                  const {
                                    state,
                                    message,
                                    study_space_data,
                                    reserve_data,
                                  } = res;
                                  if (state) {
                                    notification.success({
                                      type: "success",
                                      message,
                                    });
                                    this.props.dispatch(
                                      routerRedux.push({
                                        pathname: `/reserve-success?study_space_data=${stringify(
                                          {
                                            ...study_space_data,
                                            ...reserve_data,
                                          }
                                        )}`,
                                      })
                                    );
                                  } else {
                                    notification.error({
                                      type: "error",
                                      message,
                                    });
                                  }
                                });
                            } else {
                              notification.warning({
                                type: "warning",
                                message: "Make an appointment to failure",
                                description:
                                  "The reservation time is less than the current time. Please make a new reservation",
                              });
                            }
                          }}
                        >
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
    );
  }
}
