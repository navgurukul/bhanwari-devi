import React from "react";

import Routing from "../../routing";
import Header from "../Header";
// import "./styles/styles.css";

import "./styles.scss";

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        {" "}
        <Routing />{" "}
      </div>
    </div>
  );
}

export default App;
