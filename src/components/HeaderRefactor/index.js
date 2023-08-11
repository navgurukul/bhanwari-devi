import React, { useState } from 'react';
import ResponsiveBox from '../common/ResponsiveBox';
import TopHeader from './TopHeader';
import TopMobileHeader from './TopMobileHeader';
import MobileSidebarHeader from './MobileSidebarHeader';
import { commonMenuItems } from './constants'; // Define commonMenuItems in a separate file
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  MenuItem,
  ThemeProvider,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from '@mui/material';

function insertBeforeSlice(arr, beforeItem, item) {
  const index = arr.indexOf(beforeItem);
  return arr.slice(0, index).concat(item).concat(arr.slice(index));
}

export default function Header() {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const topMenuItems = insertBeforeSlice(
    commonMenuItems,
    'CHANGE_ROLES',
    'SEARCH'
  );

  return (
    <Container>
      <ResponsiveBox xs={<TopHeader menuItems={topMenuItems} />} md={<TopMobileHeader setToggleDrawer={setToggleDrawer} menuItems={topMenuItems} />} />
      <MobileSidebarHeader toggleDrawer={toggleDrawer} menuItems={commonMenuItems} />
    </Container>
  );
}