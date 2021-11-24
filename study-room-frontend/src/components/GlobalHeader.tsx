import React from "react";
import { Row, Col, Popover, Button, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { routerRedux } from "serpens/router";
import { clearToken } from "utils/token";
import { Link } from 'serpens/router'
interface OwnProps {}
const GlobalHeader: React.FC<OwnProps> = (props) => {
  const { email, student_name } = useSelector<
    GlobalState,
    GlobalState["login"]
  >((state) => state.login);
  const dispatch = useDispatch<EffectsDispatch>();

  const onLogin = () => {
    dispatch(routerRedux.push("/user/login"));
  };
  const onLogout = () => {
    clearToken();
    dispatch(routerRedux.push("/user/login"));
  };
  const onMyReservation=() => {
    dispatch(routerRedux.push("/reserve"));
  };
  React.useEffect(()=>{
      if(student_name===undefined){
        dispatch({
            type: "login/fetchUser",
          });
      }
  },[student_name])

  return (
    <Row>
      <Col span={12}>
        <div>
          <Link to='/'> <h1>DibSpace</h1></Link>
          <p>Find your place to study.</p>
        </div>
      </Col>
      <Col
        span={12}
        style={{
          textAlign: "right",
          alignSelf: "center",
        }}
      >
        <Popover
          content={
            <>
              {email ? (
                <>
                  <p>EMAIL:{email}</p>
                  <Row>
                    <Col span={12}>

                    
                    <Button
                      onClick={onMyReservation}
                      type="text"
                      size="small"
                      style={{ color: "orange" }}
                    >
                      My Reservation
                    </Button>
                  </Col>
                  <Col span={12}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={onLogout}
                      type="text"
                      size="small"
                      style={{ color: "blue" }}
                    >
                      logout
                    </Button>
                  </div>
                  </Col>
                  </Row>
                </>
              ) : (
                <>
                  <p>Not signed in</p>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={onLogin}
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
  );
};
const wrapMemo = React.memo(GlobalHeader);
export default wrapMemo;
