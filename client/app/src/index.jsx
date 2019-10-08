import React from "react";
import ReactDOM from "react-dom";
import App from "src/containers/App.jsx";

import "./styles/default.css";
import MainStore from "src/stores/Main";

ReactDOM.render(<App store={MainStore} />, document.getElementById("root"));
