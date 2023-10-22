import React from "react";
import { createContext } from "react";
import { useState } from "react";
let StateContext = createContext()

function LocationState({children}) {
  const [locationState, setlocationState] = useState();

  console.log("locationState", locationState);
  return (
    <StateContext.Provider value={{locationState, setlocationState}}>
        {children}
    </StateContext.Provider>
  );
}

export {LocationState, StateContext};