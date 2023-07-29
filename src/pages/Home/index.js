import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRolesData } from "../../components/User/redux/selectors";
import { actions as pathwayActions } from "../../components/PathwayCourse/redux/action";
import useStyles from "./styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PATHS } from "../../constant";
import { useHistory } from "react-router-dom";
import { PATHWAYS_INFO } from "../../constant";
import {
  ADMIN_ROLE_KEY as ADMIN,
  PARTNER_ROLE_KEY as PARTNER,
  STUDENT_ROLE_KEY as STUDENT,
  VOLUNTEER_ROLE_KEY as VOLUNTEER,
} from "../../components/Header/constant";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import { CssBaseline } from "@mui/material";

function Home() {
  const isActive = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Pathways);
  const user = useSelector(({ User }) => User);
  const roles = useSelector(selectRolesData);
  const history = useHistory();

  useEffect(() => {
    dispatch(pathwayActions.getPathways());
  }, [dispatch]);

  const miscellaneousPathway = data?.pathways.filter((pathway) =>
    PATHWAYS_INFO.some((miscPathway) => pathway.name === miscPathway.name)
  );
  const pathwayData = data?.pathways
    .filter((pathway) => !miscellaneousPathway.includes(pathway))
    .concat(miscellaneousPathway);

  const partnerGroupId = user?.data?.user?.partner_group_id;
  const partnerId = user?.data?.user?.partner_id;
  const role = user?.data?.user?.rolesList;

  const rolesLandingPages = {
    [STUDENT]: PATHS.NEW_USER_DASHBOARD,
    [ADMIN]: PATHS.PARTNERS,
    [VOLUNTEER]: PATHS.CLASS,
    [PARTNER]: partnerGroupId
      ? `${PATHS.STATE}/${partnerGroupId}`
      : `${PATHS.PARTNERS}/${partnerId}`,
  };

  let defalutPage = "/";
  roles.map((userRole) => {
    if (role?.length == 0) {
      defalutPage = "/pathway/1";
    } else if (role && userRole.key === role[0].toUpperCase()) {
      defalutPage = rolesLandingPages[userRole.key];
    }
  });
  useEffect(() => {
    history.push(defalutPage);
  }, [defalutPage]);

  return (
    <>
      <CssBaseline />
      <main>
        <SectionOne isActive={isActive} classes={classes} />
        <SectionTwo isActive={isActive} />
        <SectionThree isActive={isActive} />
        <SectionFour
          isActive={isActive}
          pathwayData={pathwayData}
          classes={classes}
        />
        <SectionFive />
        <SectionSix isActive={isActive} />
      </main>
    </>
  );
}
export default Home;
