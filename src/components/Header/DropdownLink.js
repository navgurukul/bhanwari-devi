import React from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../common/ExternalLink";
import { MenuItem, } from "@mui/material";
import useStyles from "./styles";

export default function DropdownLink({
  to,
  external,
  padding,
  margin,
  linkOnClick,
  children,
  ...props
}) {
  const A = external ? ExternalLink : Link;
  const toKey = external ? "href" : "to";
  const classes = useStyles();
  return (
    <MenuItem
      {...props}
      sx={{
        padding,
        margin
      }}
    >
      <A
        {...{
          [toKey]: to,
          className: classes.link,
          linkOnClick
        }}
        style={{ padding, display: 'flex', align-items: 'center', width: '100%' }}
      >
        {children}
      </A>
    </MenuItem>
  );
}
