const production = window.location.hostname;

export const AUTH_KEY = "__AUTH__";

export const PATHS = {
  HOME_PATH: "/",
  HOME_PAGE: "/home",
  LOGIN: "/login",
  CLASS: "/class",
  COURSE: "/course",
  PATHWAY_COURSE_CONTENT: "/course-content/:pathwayId/:courseId/:exerciseId",
  PATHWAY_COURSE_CONTENT_EDIT:
    "/course-content-edit/:pathwayId/:courseId/:exerciseId",
  COURSE_CONTENT: "/course/:courseId",
  EXERCISE: "/exercise/:exerciseId",
  PATHWAY_COURSE: "/pathway/:pathwayId",
  RESIDENTIAL_COURSE: "/residential-course",
  MISCELLANEOUS_COURSE: "/open-course",
  MENTOR: "/mentor",

  SCRATCH:
    process.env.NODE_ENV === "development"
      ? "https://dev.scratch.merakilearn.org/"
      : "https://scratch.merakilearn.org/",
  // SCRATCH:
  //   production === "merakilearn.org"
  //     ? "https://scratch.merakilearn.org/"
  //     : "https://dev.scratch.merakilearn.org/",

  USER: "/user",
  PROFILE: "/profile",
  ME: "/me",
  PRIVACY_POLICY: "/privacy",
  AFE: "/amazon-future-engineer",
  PARTNERS: "/partner",
  PARTNER_DATA: "/partner/:partnerId",
  STUDENT: "/student/:studentId",
  OPPORTUNITIES: "/opportunities",
  NAVGURUKUL_INTRODUCE: "/navgurukul/:partnerId",
  // ADMISSION: "/admission",
  REDIRECT: "/redirect",
  VOLUNTEER: "/volunteer",
  TEAM: "/team",
  STATEPARTNER: "/state-dashboard/:clusterId",
  STATE: "/state-dashboard",
  VOLUNTEER_OVERVIEW: "/volunteer/:volunteerId",
  OUR_PARTNER: "/our-partner",
  OUR_STORY: "/our-story",
  NEW_USER_DASHBOARD: "/user-dashboard",
  PYTHON_COURSE: "/python-course",
  SEARCHED_COURSE: "/search-course",
  RETURNING_USER_PAGE: "/returning-user",
  VOLUNTEER_AUTOMATION: "/volunteer-with-us",
  VOLUNTEER_FORM: "/volunteer-form",
  CLASS_FORM: "/class-form-model",
  TUTOR: "/tutor-dashboard",
  GSOC_IDEA: "/gsoc-ideas-2023",
  ACB_BATCH: "/amazon-batch-class",
};

export const HideHeader = [
  PATHS.PATHWAY_COURSE_CONTENT,
  PATHS.PATHWAY_COURSE_CONTENT_EDIT,
  PATHS.VOLUNTEER_FORM,
];
export const HideFooter = [
  PATHS.LOGIN,
  PATHS.PATHWAY_COURSE_CONTENT,
  PATHS.PATHWAY_COURSE_CONTENT_EDIT,
  PATHS.PROFILE,
  PATHS.MENTOR,
  // PATHS.PRIVACY_POLICY,
  PATHS.NEW_USER_DASHBOARD,
  PATHS.VOLUNTEER_FORM,
];

export const LEARN_KEY = "LEARN";
export const ABOUT_KEY = "ABOUT";
export const GET_INVOLVED_KEY = "GET_INVOLVED";
export const GSOC_IDEA_KEY = "Gsoc IDEA 2023";

export const MENU_ITEMS = {
  [ABOUT_KEY]: [
    { titleMsgKey: "OUR_STORY", path: PATHS.OUR_STORY, type: "internal" },
    { titleMsgKey: "MERAKI_TEAM", path: PATHS.TEAM, type: "internal" },
  ],
  [GET_INVOLVED_KEY]: [
    // {
    //   title: "Become a Partner",
    //   path: PATHS.OUR_PARTNER,
    //   type: "internal",
    // },

    {
      titleMsgKey: "VOLUNTEER_WITH_US",
      path: PATHS.VOLUNTEER_AUTOMATION,
      type: "internal",
    },

    {
      titleMsgKey: "DONATE",
      path: "https://www.navgurukul.org/donate",
      type: "external",
    },
    {
      titleMsgKey: "CAREERS",
      path: "https://recruiterflow.com/navgurukul/jobs",
      type: "external",
    },
  ],
};

// No Pathways should get added except for this
export const PATHWAYS_INFO = [
  {
    id: null,
    name: "Miscellaneous Courses",
    logo: "misc",
    description: "Courses on Android, Game dev projects and more",
    sub_description: "Courses on Android, Game dev projects and more",
    // type: "internal",
    path: PATHS.MISCELLANEOUS_COURSE,
    outcomes: [],
  },
];

/*
export const dateTimeFormat = (date) => {
  try {
    const datePart = date?.split("T")[0].split("-").reverse();
    const TimePart = date?.split("T")[1].split(":");
    const finalDate = `${datePart[0]} ${month[datePart[1]]}, ${datePart[2]} `;
    const finalTime = `${TimePart[0]} : ${TimePart[1]}`;
    return { finalTime, finalDate };
  } catch {
    return { finalTime: "", finalDate: "" };
  }
};
*/

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

export const lang = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
};

export const dateTimeFormat = (date) => {
  try {
    const datePart = date?.split("T")[0].split("-").reverse();
    const TimePart = date?.split("T")[1].split(":");
    const finalDate = `${datePart[0]} ${month[datePart[1]]}, ${datePart[2]} `;
    const finalTime = `${TimePart[0]} : ${TimePart[1]}`;
    return { finalTime, finalDate };
  } catch {
    return { finalTime: "", finalDate: "" };
  }
};

export const TimeLeft = (date) => {
  try {
    const datePart = date?.split("T")[0].split("-").reverse();
    const TimePart = date?.split("T")[1].split(":");
    // calculate the time left for the event
    const timeLeft = new Date(
      `${datePart[0]} ${month[datePart[1]]}, ${datePart[2]} ${TimePart[0]}:${
        TimePart[1]
      }`
    );
    const now = new Date(
      new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );
    // const now = new Date();
    const diff = timeLeft - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days} days ${hours} hrs ${minutes} mins`;
    } else if (hours > 0 && days === 0) {
      return `${hours} hrs ${minutes} mins`;
    } else if (minutes > 10 && days === 0) {
      return `${minutes} mins`;
    } else if (minutes <= 10 && minutes > -60) {
      return "joinNow";
    } else {
      return "expired";
    }
  } catch (error) {
    return "expired";
  }
};

export const interpolatePath = (path, paramValues) =>
  path.replace(/:(\w*)/g, (_, param) => paramValues[param]);
export const versionCode = 40;
