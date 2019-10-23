import Home from "src/containers/Home.jsx";
import Welcome from "src/containers/Welcome";
import Game from "src/containers/Game";
import Auth from "src/containers/Auth";

export default {
  "/game": { component: Game },
  "/auth/:accessToken": {
    component: Auth,
  },
  "/": { component: Welcome, exact: true },
};
