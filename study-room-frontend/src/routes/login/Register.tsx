import React from "react";
import { intl } from "serpens";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Row, Col, Form, message, notification } from "antd";
import { MessageType } from "antd/lib/message";
import lodash, { values } from "lodash";
import { withRouter, routerRedux } from "serpens/router";
// import LanguageSelector from 'components/LanguageSelector'
import { clearToken } from "utils/token";
import styles from "./Login.less";
import locales from "./index.json";
import moment from "moment";

const t = intl.load(locales);
const LoginPage: React.FC = (props) => {
  const { codeSecond } = useSelector<
    GlobalState,
    GlobalState["login"]
  >((state) => state?.login);
  const dispatch = useDispatch<EffectsDispatch>();
  const [form] = Form.useForm();
  const handleSubmit = async (values: {
    studyname: string;
    email: string;
    code: string;
  }) => {
    const payload = {
      student_name: values.studyname,
      student_id: moment().format("YYYYMMDDHHmmss"),
      email: values.email,
      code: values.code,
    };
    dispatch({
      type: "login/signUp",
      payload,
    }).then((res: { state: boolean; message: string }) => {
      const { state, message } = res;
      if (state) {
        notification.success({
          type: "success",
          message,
        });
        dispatch(
            routerRedux.push('/user/login')
        )
      } else {
        notification.error({
          type: "error",
          message,
        });
      }
    });
  };
  const sendEmail = () => {
    form.validateFields(["email"]).then((values) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      const sendTo = values.email;
      if (reg.test(sendTo)) {
        if (sendTo) {
          const payload = {
            type: "register",
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
              let mySecond = 60;
              const codeInterval = setInterval(async () => {
                if (mySecond <= 0) {
                  dispatch({
                    type: "login/save",
                    payload: {
                      codeSecond: undefined,
                    },
                  });
                  clearInterval(codeInterval);
                } else {
                  mySecond = mySecond - 1;
                  dispatch({
                    type: "login/save",
                    payload: {
                      codeSecond: mySecond,
                    },
                  });
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
              message: t("please_enter_username"),
            },
          ]}
          name="studyname"
        >
          <Input size="large" placeholder={t("username")} />
        </Form.Item>
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
            {"Sign up"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const wrapMemo = React.memo(LoginPage);
const wrapRouter = withRouter(wrapMemo);
const wrapIntl = intl(wrapRouter);
export default wrapIntl;
