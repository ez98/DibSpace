import React from "react";
import { intl } from "serpens";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Row, Col, Form, message, notification } from "antd";
import { MessageType } from "antd/lib/message";
import lodash from "lodash";
import { withRouter, routerRedux, RouteProps } from "serpens/router";
// import LanguageSelector from 'components/LanguageSelector'
import { clearToken } from "utils/token";
import styles from "./Login.less";
import locales from "./index.json";

const t = intl.load(locales);

let messageInstance: MessageType;
const LoginPage: React.FC<RouteProps> = (props) => {
  const [codeSecond, setCodeSecond] = React.useState<number>();

  const dispatch = useDispatch<EffectsDispatch>();
  const [form] = Form.useForm();

  const sendEmail = () => {
    form.validateFields(["email"]).then((values) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      const sendTo = values.email;
      if (reg.test(sendTo)) {
        if (sendTo) {
          const payload = {
            type: "login",
            sendTo: form.getFieldValue("email"),
          };
          dispatch({
            type: "login/sendEmail",
            payload,
          }).then((res: any) => {
            if (res.state) {
              notification.success({
                type: "success",
                message: res.message,
              });
              let mySecond: number = 60;
              const codeInterval = setInterval(async () => {
                if (mySecond <= 0) {
                  setCodeSecond(undefined);
                  clearInterval(codeInterval);
                } else {
                  mySecond = mySecond - 1;
                  setCodeSecond(mySecond);
                }
              }, 1000);
            } else {
              notification.warning({
                type: "warning",
                message: res.message,
              });
            }
          });
        } else {
          notification.warning({
            type: "warning",
            message: "Please enter email address",
          });
        }
      } else {
        notification.error({
          type: "error",
          message: "Email format error！",
        });
      }
    });
  };
  const handleSubmit = async (values: { email: string; code: string }) => {
    dispatch({
      type: "login/login",
      payload: values,
    }).then((res: { state: boolean; message: string }) => {
      const { state, message } = res;
      if (res.state) {
        notification.success({
          type: "success",
          message,
        });
        dispatch(routerRedux.push("/"));
      } else {
        notification.error({
          type: "error",
          message,
        });
      }
    });
  };
  return (
    <div className={styles.main}>
      <Form
        layout="vertical"
        form={form}
        onFinish={lodash.throttle(handleSubmit, 1000, {
          leading: true,
          trailing: false,
        })}
      >
        <Form.Item
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter the Email",
            },
          ]}
          name="email"
        >
          <Input
            size="large"
            type="email"
            placeholder={"Email"}
            // autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please enter the verification code",
            },
          ]}
          name="code"
        >
          <Row>
            <Col span={16}>
              <Input
                size="large"
                type="code"
                placeholder={"Verification code"}
                // autoComplete="off"
              />
            </Col>
            <Col
              span={8}
              style={{
                padding: " 0 10px",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <Button
                type="text"
                style={{ padding: 0 }}
                disabled={codeSecond !== undefined}
                onClick={sendEmail}
              >
                {codeSecond === undefined ? (
                  <span>
                    <div>Click send </div>
                    <div>verification code</div>
                  </span>
                ) : (
                  `${codeSecond} S`
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            style={{
              backgroundColor: "#0068eb",
              color: "#fff",
              borderRadius: 0,
            }}
            size="large"
            block
            htmlType="submit"
          >
            {t("sign_in")}
          </Button>
        </Form.Item>
        <Row justify="space-between">
          <Col span={12}>
            <Form.Item>
              <Button
                style={{ padding: "0" }}
                onClick={() => {
                  dispatch(
                    routerRedux.push({
                      pathname: "/user/register",
                    })
                  );
                }}
                type="text"
              >
                <b>No users? Click to sign up</b>
              </Button>
            </Form.Item>
          </Col>
          <Col span={12} style={{textAlign:'center'}}>
            <Form.Item>
              <Button
                style={{ padding: "0" }}
                onClick={() => {
                  dispatch(
                    routerRedux.push({
                      pathname: "/",
                    })
                  );
                }}
                type="text"
              >
                <b>Back Home</b>
              </Button>
            </Form.Item>{" "}
          </Col>
        </Row>
      </Form>
    </div>
  );
};
const wrapMemo = React.memo(LoginPage);
const wrapRouter = withRouter(wrapMemo);
const wrapIntl = intl(wrapRouter);
export default wrapIntl;
