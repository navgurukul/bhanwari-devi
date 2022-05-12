export const AUTH_KEY = "__AUTH__";

export const PATHS = {
  HOME_PATH: "/",
  LOGIN: "/login",
  CLASS: "/class",
  COURSE: "/course",
  PATHWAY_COURSE_CONTENT: "/course-content/:pathwayId/:courseId/:exerciseId",
  COURSE_CONTENT: "/course/:courseId",
  EXERCISE: "/exercise/:exerciseId",
  PATHWAY_COURSE: "/pathway/:pathwayId",
  RESIDENTIAL_COURSE: "/residential-course",
  MISCELLANEOUS_COURSE: "/open-course",
  MENTOR: "/mentor",
  USER: "/user",
  PROFILE: "/profile",
  PRIVACY_POLICY: "/privacy",
  AFE: "/amazon-future-engineer",
  PARTNERS: "/partner",
  PARTNER_DATA: "/partner/:partnerId",
  STUDENT: "/student/:studentId",
  OPPORTUNITIES: "/opportunities",
  NAVGURUKUL_INTRODUCE: "/navgurukul/:partnerId",
  ADMISSION: "/admission",
  REDIRECT: "/redirect",
  VOLUNTEER: "/volunteer",
  MERAKI_TEAM: "/team",
  STATEPARTNER: "/state-dashboard/:clusterId",
  STATE: "/state-dashboard",
  VOLUNTEER_OVERVIEW: "/volunteer/:volunteerId",
  OUR_PARTNER: "/our-partner",
  OUR_STORY: "/our-story",
  NEWUSER_DASHBOARED: "/user-dashboared",
  PYTHONCOURSE: "/Python-course",
};

export const HideHeader = [PATHS.PATHWAY_COURSE_CONTENT];
export const HideFooter = [
  PATHS.LOGIN,
  PATHS.PATHWAY_COURSE_CONTENT,
  PATHS.PROFILE,
  PATHS.MENTOR,
  PATHS.PRIVACY_POLICY,
  PATHS.NEWUSER_DASHBOARED,
];
const month = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
export const dateTimeFormat = (date) => {
  const datePart = date?.split("T")[0].split("-").reverse();
  const TimePart = date.split("T")[1].split(":");
  const finalDate = `${datePart[0]} ${month[datePart[1]]}, ${datePart[2]} `;
  const finalTime = `${TimePart[0]} : ${TimePart[1]}`;
  return { finalTime, finalDate };
};
export const interpolatePath = (path, paramValues) =>
  path.replace(/:(\w*)/g, (_, param) => paramValues[param]);

export const versionCode = 40;
