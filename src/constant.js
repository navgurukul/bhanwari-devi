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
  STATEPARTNER: "/state-dashboard/:clusterId",
  STATE: "/state-dashboard",
  VOLUNTEER_OVERVIEW: "/volunteer/:volunteerId",
  OUR_PARTNER: "/our-partner",
  OUR_STORY: "/our-story",
};

export const HideHeader = [PATHS.PATHWAY_COURSE_CONTENT];
export const HideFooter = [
  PATHS.LOGIN,
  PATHS.PATHWAY_COURSE_CONTENT,
  PATHS.PROFILE,
  PATHS.MENTOR,
  PATHS.PRIVACY_POLICY,
];

export const interpolatePath = (path, paramValues) =>
  path.replace(/:(\w*)/g, (_, param) => paramValues[param]);

export const versionCode = 40;
