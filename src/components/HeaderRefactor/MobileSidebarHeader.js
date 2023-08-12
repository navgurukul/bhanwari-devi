import React from 'react';
import { SwipeableDrawer } from '@mui/material';

export default function MobileSidebarHeader({ isOpen, setIsOpen }) {
  //const [isOpen, setIsOpen] = React.useState(false);
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      {/*<MobileVersion {...{ toggleDrawer, leftDrawer, setRole, role }} />*/}
      Something
    </SwipeableDrawer>
  );
}