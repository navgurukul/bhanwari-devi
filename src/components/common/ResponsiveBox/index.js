import { Box } from "@mui/material";
import React from "react";

export default function ResponsiveBox(props) {
  const breakpointArr = ["xs", "sm", "md", "lg", "xl"];
  const usedBreakpoints = breakpointArr.filter(
    (breakpoint) => props[breakpoint]
  );

  return usedBreakpoints.map((breakpoint, index) => {
    const previousBreakpoints = usedBreakpoints
      .slice(0, index)
      .reduce((obj, bp) => ({ ...obj, [bp]: "none" }), {});
    const nextBreakpoint =
      index < usedBreakpoints.length - 1
        ? { [usedBreakpoints[index + 1]]: "none" }
        : {};
    const displayBreakpoints = {
      ...previousBreakpoints,
      [breakpoint]: "flex",
      ...nextBreakpoint,
    };

    return (
      <Box
        sx={{
          flexGrow: 0,
          display: displayBreakpoints,
        }}
      >
        {props[breakpoint]}
      </Box>
    );
  });
}
