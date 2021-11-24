import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Row, Col, Avatar, Popover, Button, Card, Form, Input } from "antd";
import SpaceListItem from "./SpaceListItem";
import { connect } from "serpens";

import logo from "assets/imgs/logo.jpeg";

@connect(({ global_room }) => ({
  spacesList: global_room.spacesList,

}))
export default class SpaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
      searchKey:undefined
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "global_room/fetchStudyspace",
    });
    
  }
  
  componentWillUnmount() {}
  onSearch=async ()=>{
    const {searchKey}=this.state
    await this.props.dispatch({
      type:'global_room/save',
      payload:{
        searchKey
      }
    })
    this.props.dispatch({
      type: "global_room/fetchStudyspace",
    })
  }

  render() {
    const { spacesList } = this.props;
    // const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"],
    // [2, "MTCC", 2, "high","mtcc-train.jpg"],
    // [3, "Rettaliata", 2, "mid", "rettaliata.jpg"]];
    return (
      <Container>
    
        <Row>
          <Col span={24}>
            <Card>
            <Row>
          <Col style={{ textAlign: "center" }} xs={24} xl={{offset:6,span:12}}>
                <img src={logo} alt="DibSpace" width="100%" />
              </Col>
              </Row>
              <Form >
                <Row>
                  <Col span={12}>
                    <Form.Item label={"Search Key"}>
                      <Input placeholder={"please input search key"} 
                      allowClear
                      value={this.state.searchKey} onChange={(val)=>{
                        this.setState({
                          searchKey:val.target.value
                        })
                      }} style={{width:'80%'}}></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12} label={' '}>
                    <Button type='primary' onClick={this.onSearch}>Search</Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>

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
                  open_time={space.open_time}
                  close_time={space.close_time}
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
    );
  }
}
