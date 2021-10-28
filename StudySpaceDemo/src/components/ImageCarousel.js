import { Container, Carousel, Row } from "react-bootstrap";
import img1 from "../imgs/galvin-library.jpg";
import img2 from "../imgs/galvin-inside.jpg";

export default function ImageCarousel(props) {
  return <div>
    <Container>
      <Row>
        <Carousel>
          <Carousel.Item>
            <img 
              classname="d-block mx-auto"
              src={img1} 
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