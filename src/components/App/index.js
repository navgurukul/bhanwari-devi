import React from "react";

import Routing from "../../routing";
import Header from "../Header";
// import NewHeader from "../NewHeader";

import "./styles.scss";

function App() {
  return (
    <div className="layout">
      <Header />
      {/* <NewHeader /> */}
      <div className="content">
        {" "}
        <Routing />{" "}
      </div>
    </div>
  );
}

export default App;
