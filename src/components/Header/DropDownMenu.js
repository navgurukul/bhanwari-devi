import React from "react";
import { isTouchScreen } from "../../common/utils";
import Menu from "@mui/material/Menu";

/**
 * Component for representing a dropdown menu with a visible toggling button.
 *   Clicking on the button the first time (or also hovering over it on a non-touch
 *   screen) opens the menu clicking on the button a second time or on the menu option
 *   closes it. The menu is also closed after a delay after moving off of it
 *   (on a non-touch screen).
 * @param {ReactElement} DropDownButton the button to toggle the opening/closing of the menu
 * @param {object=} menuContainerProps properties of the menu
 * @param {number=} delay the delay in ms for which to close the menu on a non-touch screen after
 *   the pointer is moved off of it, defaults to 200
 * @param {boolean=} attachRight true exactly when the dropdown menu's right edge should coincide
 *  with the right of the toggle button
 * @param {Function=} onOpenMenu an optional handler that's called when the menu is opened
 * @param {Function=} onCloseMenu an optional handler that's called when the menu is closed
 * @param {Array.<MenuItem>} children the Array of options in the dropdown menu
 */
export default function DropDownMenu({
  DropDownButton,
  menuContainerProps,
  delay,
  attachRight,
  onOpenMenu,
  onCloseMenu,
  children,
}) {
  const [inDropdown, setInDropdown] = React.useState({
    inProgress: false,
    value: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  // #802: part of hack to make button clickable over presentation layer
  //   when menu is open, needed for sidebar
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  // We can just adjust the margin left/top of the presentation layer when
  //   attaching the menu to the left, but the hack won't work if attaching
  //   to the right. In that case, we use a preset margin-top which is set
  //   for the current heading.
  const useOffset = !attachRight;
  const offset = useOffset
    ? { ml: offsetX + "px", mt: offsetY + "px" }
    : { mt: "45px" };

  const inDropdownRef = React.useRef(inDropdown);
  inDropdownRef.current = inDropdown;

  const handleOpenMenu = (event) => {
    typeof onOpenMenu === "function" && onOpenMenu(event);
    setAnchorEl(event.currentTarget);
    setOffsetX(event.currentTarget.getBoundingClientRect().left);
    setOffsetY(event.currentTarget.getBoundingClientRect().bottom);
    /*
    setOffsetY(
      event.currentTarget.getBoundingClientRect().bottom -
        event.currentTarget.getBoundingClientRect().height / 2 +
        6
    );
    */
  };

  const handleCloseMenu = () => {
    typeof onCloseMenu === "function" && onCloseMenu();
    setAnchorEl(null);
  };

  const updateInDropdownState = () => {
    setInDropdown({ inProgress: true, value: false });
    setTimeout(
      () =>
        setInDropdown({
          value: inDropdownRef.current?.value,
          inProgress: false,
        }),
      delay || 200
    );
  };

  const DropDownButtonWithHandlers = React.cloneElement(DropDownButton, {
    onMouseEnter: (e) => {
      if (typeof DropDownButton.props.onMouseEnter === "function") {
        DropDownButton.props.onMouseEnter(e);
      }
      if (!isTouchScreen()) {
        setInDropdown({ value: true, inProgress: false });
        handleOpenMenu(e);
      }
    },
    onMouseLeave: (e) => {
      if (typeof DropDownButton.props.onMouseLeave === "function") {
        DropDownButton.props.onMouseLeave(e);
      }

      if (!isTouchScreen()) {
        updateInDropdownState();
      }
    },
    onClick: (e) => (anchorEl ? handleCloseMenu() : handleOpenMenu(e)),
    /*
    style: {
      // #802: hack to make button clickable over presentation layer when menu is open
      //  This won't work because its header parent has a lower z-index than the modal
      //  We can change this 
      // (https://mui.com/material-ui/customization/default-theme/?expand-path=$.zIndex)
      //  but its an even worse hack and the shadow will appear under the header. 
      position: 'relative',
      zIndex: (menuContainerProps?.zIndex || 0) + 10000,
      ...DropDownButton.props.style,
    },
    */
  });

  React.useEffect(() => {
    if (!inDropdown.inProgress && !inDropdown.value) {
      // mouse has moved out of main menu item and its
      //   dropdown after delay milliseconds
      // menuCloseHandler();
      //console.log(inDropdown);
      handleCloseMenu();
    }
  }, [inDropdown]);

  return (
    <>
      {DropDownButtonWithHandlers}
      <Menu
        // anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        // anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        // transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        // #802: hack to make button clickable over presentation layer when menu is open
        //   Make presentation layer appear below header so it doesn't cover the button.
        //   This is very fragile as there may be more than one header.
        // sx={{mt: (document.querySelector('header')?.outerHeight || 78) + "px"}}
        // sx={{zIndex: 0}}
        // Use 45px for margin-top (as of now 1/2 the height of the header + 6px)
        {...menuContainerProps}
        // TODO: height: 100% wasn't needed before, what changed for LEARN menu?
        // style={{ height: 100% }}
        sx={{ ...offset, ...menuContainerProps?.sx }}
        anchorOrigin={{
          vertical: "top",
          horizontal: useOffset ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: useOffset ? "left" : "right",
        }}
        anchorReference={useOffset ? "none" : "anchorEl"}
        keepMounted
        anchorEl={anchorEl}
        MenuListProps={{
          onMouseEnter: () =>
            !isTouchScreen() &&
            setInDropdown({ value: true, inProgress: false }),
          onMouseLeave: () => !isTouchScreen() && updateInDropdownState(),
          onClick: handleCloseMenu,
        }}
        hideBackdrop
        open={!!anchorEl}
        // To resolve issue https://github.com/mui/material-ui/issues/5185
        disableScrollLock={true}
      >
        {children}
      </Menu>
    </>
  );
}
