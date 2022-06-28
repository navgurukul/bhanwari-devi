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
  TEAM: "/team",
  STATEPARTNER: "/state-dashboard/:clusterId",
  STATE: "/state-dashboard",
  VOLUNTEER_OVERVIEW: "/volunteer/:volunteerId",
  OUR_PARTNER: "/our-partner",
  OUR_STORY: "/our-story",
  NEW_USER_DASHBOARED: "/user-dashboared",
  PYTHON_COURSE: "/Python-course",
  SEARCHED_COURSE: "/search-course",
  RETURNING_USER_PAGE: "/Returning-user",
  VOLUNTEER_AUTOMATION: "/volunteer-with-us",
  VOLUNTEER_FORM: "/volunteer-form",
};

export const HideHeader = [PATHS.PATHWAY_COURSE_CONTENT];
export const HideFooter = [
  PATHS.LOGIN,
  PATHS.PATHWAY_COURSE_CONTENT,
  PATHS.PROFILE,
  PATHS.MENTOR,
  PATHS.PRIVACY_POLICY,
  PATHS.NEW_USER_DASHBOARED,
  PATHS.VOLUNTEER_FORM,
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
    console.log(
      "days",
      days,
      "hours",
      hours,
      "minutes",
      minutes,
      "seconds",
      seconds
    );

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
