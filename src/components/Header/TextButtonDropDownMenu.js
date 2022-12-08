import React from "react";
import DropDownMenu from "./DropDownMenu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Message from "../common/Message";

/**
 * Component for representing a dropdown menu with a visible multilingual text toggling
 *   button with expanding more/less icon.
 *   Clicking on the button the first time (or also hovering over it on a non-touch
 *   screen) opens the menu while clicking on the button a second time or on the menu
 *   option closes it. The menu is also closed after a delay after moving off of it
 *   (on a non-touch screen).
 * @param {string} btnTextMsgKey the constant key for the text to display on the button
 * @param {Array.<ReactElement>=} btnTextArgs an optional arguments Array to supply to
 *   the Message component
 * @param {object=} menuContainerProps properties of the menu
 * @param {number=} delay the delay for which to close the menu on a non-touch screen after
 *   the pointer is moved off of it
 * @param {boolean=} attachRight true exactly when the dropdown menu's right edge should coincide
 *   with the right of the toggle button
 * @param {Array.<MenuItem>} children the Array of options in the dropdown menu
 */
export default function TextButtonDropDownMenu({
  btnTextMsgKey,
  btnTextArgs,
  menuContainerProps,
  delay,
  attachRight,
  children,
  ...otherProps
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <DropDownMenu
      DropDownButton={
        <MenuItem {...otherProps}>
          <Typography variant="subtitle1">
            <Message constantKey={btnTextMsgKey} args={btnTextArgs} />
          </Typography>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </MenuItem>
      }
      onOpenMenu={() => setIsOpen(true)}
      onCloseMenu={() => setIsOpen(false)}
      attachRight={attachRight}
      delay={delay}
      menuContainerProps={menuContainerProps}
    >
      {children}
    </DropDownMenu>
  );
}
