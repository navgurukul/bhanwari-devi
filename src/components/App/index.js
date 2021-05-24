import React from "react";

import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";

import "./styles.scss";

function App() {
  return (
    <div>
      <Header />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
