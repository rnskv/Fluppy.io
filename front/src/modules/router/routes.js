import Home from "src/containers/Home.jsx";

export default {
  "/": { component: Home, exact: true },
  "/test1": { component: Home },
  "/test2": { component: Home }
};
