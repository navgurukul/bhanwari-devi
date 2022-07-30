/*
function AuthenticatedHeader({
  toggleDrawer,
  leftDrawer,
  handleSearchChange,
}) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: leftDrawer ? "block" : "none",
            md: leftDrawer ? "none" : "flex",
          },
        }}
      >
        {(switchView === STUDENT || merakiStudents || studentView) && (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <MenuItem onClick={handleOpenLearn}>
                <Typography variant="subtitle1">
                  <Message constantKey={MENU_ITEMS[LEARN_KEY].msgKey} />
                </Typography>
                {learn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <DropDown
                dropDown={LEARN_KEY}
                indicator={learn}
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />

              <HeaderNavLink
                to={PATHS.NEW_USER_DASHBOARD}
                text={<Message constantKey="DASHBOARD" />}
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.MENTOR}
                text="Mentor"
                toggleDrawer={toggleDrawer}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MobileDropDown
                menuKey={LEARN_KEY}
                handleClose={handleCloseLearn}
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.NEW_USER_DASHBOARD}
                text={<Message constantKey="DASHBOARD" />}
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.MENTOR}
                text="Mentor"
                toggleDrawer={toggleDrawer}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: { xs: "normal", md: "flex-end" },
                width: { xs: 0, sm: "100%" },
                pr: rolesList.length < 1 && 2,
              }}
            >
              {!leftDrawer && (
                <Link to={PATHS.SEARCHED_COURSE}>
                  <Tooltip title="Search the course...">
                    <Button color="dark">
                      <SearchIcon />
                    </Button>
                  </Tooltip>
                </Link>
              )}

              <HeaderNavLink
                to={PATHS.ADMISSION}
                text="Navgurukul Admission"
                toggleDrawer={toggleDrawer}
              />
              <HeaderNavLink
                to={PATHS.OPPORTUNITIES}
                text="Opportunity"
                toggleDrawer={toggleDrawer}
              />
            </Box>
          </>
        )}

        {!studentView && (
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "block",
                md: "flex",
              },
            }}
          >
            {(switchView || rolesList[0]) === ADMIN &&
            canSpecifyUserBaseRole ? (
              <>
                <HeaderNavLink
                  to={PATHS.USER}
                  text={<Message constantKey="STUDENTS" />}
                  toggleDrawer={toggleDrawer}
                />
                <HeaderNavLink
                  to={PATHS.VOLUNTEER}
                  text={<Message constantKey="VOLUNTEERS" />}
                  toggleDrawer={toggleDrawer}
                />
                <HeaderNavLink
                  to={PATHS.PARTNERS}
                  text="Partners"
                  toggleDrawer={toggleDrawer}
                />
                {canSpecifyPartnerGroupId && (
                  <HeaderNavLink
                    to={`${PATHS.STATE}/${partnerGroupId}`}
                    text={<Message constantKey="DASHBOARD" />}
                    toggleDrawer={toggleDrawer}
                  />
                )}
              </>
            ) : null}

            {(switchView || rolesList[0]) === VOLUNTEER ? (
              <>
                <HeaderNavLink
                  to={PATHS.CLASS}
                  text="Classes"
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}

            {(switchView || rolesList[0]) === PARTNER &&
            // "partner_view" || "partner_edit" || "partner"
            (canSpecifyPartnerGroupId || canSpecifyPartner) ? (
              <>
                <HeaderNavLink
                  to={
                    canSpecifyPartnerGroupId
                      ? `${PATHS.STATE}/${partnerGroupId}`
                      : `${PATHS.PARTNERS}/${partnerId}`
                  }
                  text={<Message constantKey="DASHBOARD" />}
                  toggleDrawer={toggleDrawer}
                />
              </>
            ) : null}
          </Box>
        )}
        {!(switchView === STUDENT || merakiStudents || studentView) &&
          !leftDrawer && (
            <Box>
              <Link to={PATHS.SEARCHED_COURSE}>
                <Tooltip title="Search the course...">
                  <Button color="dark">
                    <SearchIcon />
                  </Button>
                </Tooltip>
              </Link>
            </Box>
          )}
        <Box
          sx={{
            flexGrow: 0,
            display: {
              xs: leftDrawer ? "block" : "none",
              md: leftDrawer ? "none" : "flex",
            },
          }}
        >
          {rolesList.length > 1 ? (
            <>
              <MenuItem onClick={handleOpenSwitchView}>
                <Typography variant="subtitle1">Switch Views</Typography>
                {dropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </MenuItem>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={dropDown}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: leftDrawer ? "left" : "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: leftDrawer ? "left" : "right",
                }}
                open={Boolean(dropDown)}
                onClose={handleCloseSwitchView}
              >
                {rolesListWithDefaults.map((role) => (
                  <SwitchView
                    role={role}
                    setSwitchView={setSwitchView}
                    handleCloseSwitchView={handleCloseSwitchView}
                    switchView={switchView}
                    partner={
                      canSpecifyPartnerGroupId
                        ? `${PATHS.STATE}/${partnerGroupId}`
                        : `${PATHS.PARTNERS}/${partnerId}`
                    }
                  />
                ))}
              </Menu>
            </>
          ) : (
            rolesList.length !== 0 && (
              <MenuItem
                onClick={() => {
                  setStudentView(!studentView);
                }}
              >
                <NavLink
                  to={
                    studentView === false
                      ? interpolatePath(PATHS.PATHWAY_COURSE, {
                          pathwayId: pythonPathwayId, // want to use dashboard?
                        })
                      : rolesLandingPages[rolesList[0]]
                  }
                  className={classes.link}
                >
                  {studentView
                    ? `Switch to ${rolesList[0]} View`
                    : "Switch to student View"}
                </NavLink>
              </MenuItem>
            )
          )}
        </Box>
      </Box>

      {!leftDrawer && (
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={profile} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <NavLink to={PATHS.PROFILE} className={classes.link}>
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ width: 120, margin: "0px 10px" }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </NavLink>
            <Link
              onClick={() => dispatch(userActions.logout())}
              className={classes.link}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ width: 120, margin: "0px 10px" }}
              >
                <Typography textAlign="center" color="error">
                  Logout
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      )}
    </>
  );
}

export default AuthenticatedHeaderOption;
*/
