import React from "react";

import Routing from "../../routing";
import Footer from "../Footer";
import Header from "../Header";

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
