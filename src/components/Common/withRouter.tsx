import React from "react";
import { useLocation, useNavigate, useParams, Location, NavigateFunction, Params } from "react-router-dom";

export interface RouterProps {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}

export interface WithRouterProps {
  router: RouterProps;
}

function withRouter(Component: React.ComponentType<any>) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter;
