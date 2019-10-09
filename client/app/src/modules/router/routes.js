import Home from "src/containers/Home.jsx";
import Welcome from "src/containers/Welcome";
import Game from "src/containers/Game";

export default {
  "/": { component: Welcome, exact: true },
  "/game": { component: Game },
  "/test2": { component: Home }
};
