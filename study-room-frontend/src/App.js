import "./App.css";
import { routerRedux, Route, Switch } from "serpens/router";
import React from "react";
import { getRouterData } from "./common/router";
import { ConfigProvider } from "antd";
import { intl, connect } from "serpens";
import { Container } from "react-bootstrap";

import Header from "components/GlobalHeader";
const { LocaleContextProvider } = intl;
const { ConnectedRouter } = routerRedux;
const RoutesFC = (props) => {
  const routerData = getRouterData();
  const {
    location: { pathname },
  } = props;
  return (
    <ConfigProvider>
      {pathname.includes("user") ? null : (
        <Container>
          <Header />
        </Container>
      )}

      <Switch>
        {Object.entries(routerData).map(([k, v]) => {
          return (
            <Route key={k} path={k} exact={k === "/"} component={v.component} />
          );
        })}
      </Switch>
    </ConfigProvider>
  );
};
const wrapMemo = React.memo(RoutesFC);
const wrapIntl = intl(wrapMemo);
const connector = connect()(wrapIntl);
const Routes = connector;
export default ({ history }) => {
  return (
    <LocaleContextProvider>
      <ConnectedRouter history={history}>
        <Route component={Routes} />
      </ConnectedRouter>
    </LocaleContextProvider>
  );
};
