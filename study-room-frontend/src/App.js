import "./App.css";
import { routerRedux, Route, Switch, RouterProps } from "serpens/router";
import React from "react";
import { getRouterData } from "./common/router";
import { ConfigProvider, Spin } from "antd";
import { initialize, intl, connect } from "serpens";
const { LocaleContextProvider } = intl;
const { ConnectedRouter } = routerRedux;

const RoutesFC = () => {
  const routerData = getRouterData();
  return (
    <ConfigProvider>
      {/* <Header/> */}
      <Switch>
        {Object.entries(routerData).map(([k, v]) => {
          return <Route path={k} exact={k === "/"} component={v.component} />;
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
