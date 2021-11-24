import React from "react";
import { Col, Row, Card } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReserveList from "./components/ReserveList";
const Reserve: React.FC = (props) => {
  const dispatch = useDispatch<EffectsDispatch>();
  React.useEffect(() => {
    dispatch({
      type: "reserve/fetReservationByStudent",
    });
  }, []);
  return (
    <Container>
      <Card title="My reservation information">
        <ReserveList />
      </Card>
    </Container>
  );
};
const wrapMemo = React.memo(Reserve);
export default wrapMemo;
