import React from "react";
import { Row, Col, Card, Result, Descriptions, Button } from "antd";
import { RouteProps, withRouter } from "serpens/router";
import { intl } from "serpens";
import { parse } from "qs";
import moment from "moment";
import { useDispatch } from "react-redux";
import { routerRedux } from "serpens/router";


const ReserveSuccess: React.FC<RouteProps> = (props) => {
  const {
    location: { search },
  } = props;
  const params = parse(search, { ignoreQueryPrefix: true });  
  const dispatch = useDispatch<EffectsDispatch>();
  return (
    <Row>
      <Col xs={{offset: 2, span: 20}} xxl={{ offset: 6, span: 12 }} xl={{ offset: 6, span: 12 }}>
        <Card hoverable cover={<img alt="example" src={params?.img_build} />}>
          <Result
            status="success"
            title="Make an appointment success!"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  dispatch(
                    routerRedux.push({
                      pathname: "/",
                    })
                  );
                }}
              >
                Go Home
              </Button>
            }
          >
            <Descriptions column={1} bordered title="StudySpace Info">
              <Descriptions.Item label="Reservation ID">
                {params?.reservation_id}
              </Descriptions.Item>
              <Descriptions.Item label="Building">
                {params?.building_name}
              </Descriptions.Item>
              <Descriptions.Item label="Study Begin Time">
                {moment(params?.start_time).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="Study End Time">
                {moment(params?.end_time).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="Seat Number">
                {`R${params?.room_id}T${params?.table}`}
              </Descriptions.Item>
            </Descriptions>
          </Result>
        </Card>
      </Col>
    </Row>
  );
};
const wrapMemo = React.memo(ReserveSuccess);
const wrapRouter = withRouter(wrapMemo);
const wrapIntl = intl(wrapRouter);
export default wrapIntl;
