import React from "react";
import Routing from "../../routing";
import Header from "../Header";
import Footer from "../Footer";
// import "./styles/styles.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";

import "./styles.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        <Header />
        <div className="content">
          {" "}
          <Routing />{" "}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
