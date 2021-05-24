import React from "react";

import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";

import "./styles.scss";

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        {" "}
        <Routing />{" "}
      </div>
      <Footer />
    </div>
  );
}

export default App;
