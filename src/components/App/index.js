import React from "react";

import Routing from "../../routing";
import Header from "../Header";
import ContinueExercise from "./ContinueExercise/index";

import "./styles.scss";

function App() {
  return (
    <div>
      <Header />
      <Routing />
      <ContinueExercise />
    </div>
  );
}

export default App;
