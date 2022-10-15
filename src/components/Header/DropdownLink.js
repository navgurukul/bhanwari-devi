import { Link } from "react-router-dom";
import ExternalLink from "../common/ExternalLink";
import { MenuItem, } from "@mui/material";

export default function DropdownLink({
  to,
  external,
  padding,
  linkOnClick,
  children,
  ...props
}) {
  const A = external ? ExternalLink : Link;
  const toKey = external ? "href" : "to";
  return (
    <MenuItem
      {...props}
      sx={{
        padding: 0
      }}
    >
      <A
        {...{
          [toKey]: to,
          className: classes.link,
          sx: { padding, display: 'inline-block' },
          linkOnClick
        }}
      >
        {children}
      </A>
    </MenuItem>
  );
}
