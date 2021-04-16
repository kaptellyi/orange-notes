interface Meta {
  title?: string;
  authNotRequired?: boolean;
  redirectPath?: string;
}

export default interface RouteConfig {
  component: any;
  path?: string[] | string;
  exact?: boolean;
  context?: any;
  meta?: Meta;
  routes?: RouteConfig[];
}
