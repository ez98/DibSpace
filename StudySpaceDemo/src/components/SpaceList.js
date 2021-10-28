import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import SpaceListItem from "./SpaceListItem";
import {variables} from '../Variables.js'

//when clicking on reserve room, this component activates. 
//Ideally, I think we should list all available buildings first
//let the user click on their choice of building, and then list study spaces
//The reason why I have to generate random seats/noise levels for the list displayed in the browser
//is because I still don't know what study space the user is choosing.
//I am only working with what Hannah created for the frontend
export default class SpaceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buildings: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList(){
    fetch(variables.API_URL + 'building')
    .then(response => response.json())
    .then(data => {
      this.setState({buildings:data})
    });
  }

  pickRand(){
    const rand = Math.floor(Math.random() * 7);
    if (rand > 1){
      return rand
    }
    else{
      return rand + 1;
    }
  }
  pickNoise(){
    const rand = Math.floor(Math.random() * 3);

    switch(rand) {
      case 0:
        return "low";
      case 1:
        return "mid";
      case 2:
        return "high"
    }
  }

  render() {
    const{
      buildings,
    }=this.state;

    

    // const spaces = [[1, "Galvin Library", 4, "low", "galvin-library.jpg"], 
    //                 [2, "MTCC", 2, "high","mtcc-train.jpg"], 
    //                 [3, "Rettaliata", 2, "mid", "rettaliata.jpg"],
    //                 [4, "Rettaliata", 6, "mid", "rettaliata.jpg"]];

    return (
      //have to query study_space here and update table so that it also carries the building name
      //when clicking on a building, it should display an option to choose a study space.
      //once we choose the study space, send a GET http request to our API to display the study space information

      <Container>
        <Row>
          <h2>{this.props.listTitle}</h2>
        </Row>
        <Row>
          <ListGroup>
            {buildings.map((bld) =>
             <SpaceListItem 
             key={bld.building_tag} 
             building={bld.building_name} 
             id={bld.building_tag} 
             seats={this.pickRand()}
             noise={this.pickNoise()}
             image={bld.photo}
             opens={bld.open_time} 
             closes={bld.close_time} 
             />)}
          </ListGroup>
        </Row>

      <div>
      </div>
      </Container>
    )
  }
}
