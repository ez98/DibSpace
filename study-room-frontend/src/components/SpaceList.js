import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Row, Col, Avatar, Popover, Button } from "antd";
import SpaceListItem from "./SpaceListItem";
import { connect } from "serpens";
import ImageCarousel from "./ImageCarousel";
import { routerRedux } from "serpens/router";
import { setToken, clearToken } from "utils/token";

@connect(({ global_room, login }) => ({
  spacesList: global_room.spacesList,
  student_name: login.student_name,
  email: login.email,
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
    this.props.dispatch({
      type: "login/fetchUser",
    });
  }
  onLogin = () => {
    this.props.dispatch(routerRedux.push("/user/login"));
  };
  onLogout = () => {
    clearToken()
    this.props.dispatch(routerRedux.push("/user/login"));
  };

  componentWillUnmount() {}

  render() {
    const { spacesList, student_name, email } = this.props;
    // const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"],
    // [2, "MTCC", 2, "high","mtcc-train.jpg"],
    // [3, "Rettaliata", 2, "mid", "rettaliata.jpg"]];
    return (
      <Row>
        <Col xl={{ offset: 6, span: 12 }} xs={{ offset: 2, span: 20 }}>
          <Container>
            <Row>
              <Col span={12}>
                <div>
                  <h1>DibSpace</h1>
                  <p>Find your place to study.</p>
                </div>
              </Col>
              <Col
                span={12}
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <Popover
                  content={
                    <>
                      {email ? (
                        <>
                          <p>EMAIL:{email}</p>
                          <div style={{ textAlign: "right" }}>
                            <Button
                              onClick={this.onLogout}
                              type="text"
                              size="small"
                              style={{ color: "blue" }}
                            >
                              logout
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>Not signed in</p>
                          <div style={{ textAlign: "right" }}>
                            <Button
                              onClick={this.onLogin}
                              type="text"
                              size="small"
                              style={{ color: "blue" }}
                            >
                              login in
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  }
                >
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {student_name ? student_name : "Undefined"}
                  </Avatar>
                </Popover>
              </Col>
            </Row>

            <ImageCarousel />

            <Row>
              <h2>{this.props.listTitle}</h2>
            </Row>
            <Row style={{ justifyContent: "space-around" }}>
              <Col span={24}>
                <ListGroup>
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
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    );
  }
}
