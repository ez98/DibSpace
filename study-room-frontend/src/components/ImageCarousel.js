import { Container, Carousel, Row } from "react-bootstrap";
import img1 from "assets/imgs/galvin-library.jpg";
import img2 from "assets/imgs/galvin-inside.jpg";
import img3 from "assets/imgs/mtcc-train.jpg";
import img4 from "assets/imgs/pritzker.jpg";
import img5 from "assets/imgs/rettaliata.jpg";
import React from 'react';

export default function ImageCarousel(props) {
  return <div>
    <Container>
      <Row>
        <Carousel>
          <Carousel.Item>
            <img 
              classname="d-block mx-auto"
              src={img1} 
              width="100%"
              alt="Galvin Library"
            />
            <Carousel.Caption>
              <h3>Welcome to DibSpace</h3>
              <p>The Study Space App</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img 
              classname=""
              src={img2}
              width="100%"

              alt="Galvin Library Interior"
            />
            <Carousel.Caption>
              <h3>Welcome to DibSpace</h3>
              <p>The Study Space App</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img 
              classname=""
              src={img3}
              width="100%"

              alt="Galvin Library Interior"
            />
            <Carousel.Caption>
              <h3>Welcome to DibSpace</h3>
              <p>The Study Space App</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img 
              classname=""
              src={img5}
              width="100%"

              alt="Galvin Library Interior"
            />
            <Carousel.Caption>
              <h3>Welcome to DibSpace</h3>
              <p>The Study Space App</p>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </Row>
    </Container>
  </div>
}