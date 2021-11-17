import { useParams, useLocation } from "react-router";
import ReserveSpace from "./ReserveSpace";
import SpaceInfo from "./SpaceInfo";
import { Container, Row} from "react-bootstrap"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Space(props) {

  let query = useQuery();

  const { spaceId } = useParams();

  return <div>
    <Container>
      <Row>
        <SpaceInfo 
          className="mb-3 ml-3"
          spaceId={spaceId} 
          building={query.get("building")} 
          seats={query.get("seats")} 
          noise={query.get("noise")} 
          image={query.get("image")}/>
      </Row>
      <Row>
      <ReserveSpace className="mb-3"
        spaceId={query.get("building")}/>
      </Row>
    </Container>
  </div>
}