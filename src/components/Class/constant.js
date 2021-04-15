export const TIME_CONSTANT = {
  CLASS_START_DATE: "start_time",
  CLASS_END_DATE: "end_time",
  CLASS_START_TIME: "class_start_time",
  CLASS_END_TIME: "class_end_time",
};

export const CLASS_FORM_FIELDS = [
  {
    id: "title",
    name: "title",
    label: "Title*",
    required: true,
  },
  {
    name: "description",
    label: "Description*",
    type: "textarea",
    required: true,
  },
  {
    name: "facilitator_name",
    label: "Facilator Name*",
    required: true,
  },
  {
    name: "facilitator_email",
    label: "Facilator Email*",
    type: "email",
    required: true,
  },
  {
    // "start_time": "2020-11-22",
    name: TIME_CONSTANT.CLASS_START_DATE,
    label: "Start Date*",
    type: "date",
    inputClassName: "small-text",
    required: true,
  },
  {
    name: TIME_CONSTANT.CLASS_START_TIME,
    id: TIME_CONSTANT.CLASS_START_TIME,
    label: "Start Time*",
    type: "time",
    inputClassName: "small-text",
    required: true,
  },
  {
    name: TIME_CONSTANT.CLASS_END_TIME,
    id: TIME_CONSTANT.CLASS_END_TIME,
    label: "End Time*",
    type: "time",
    inputClassName: "small-text",
    required: true,
  },
  {
    name: "category_id",
    label: "Category Id*",
    type: "text",
    list: "category",
    inputClassName: "small-text",
    onKeyDown: (e) => e.preventDefault(),
    required: true,
  },
  {
    name: "lang",
    label: "Language*",
    type: "text",
    list: "language",
    inputClassName: "small-text",
    onKeyDown: (e) => e.preventDefault(),
    required: true,
  },
  {
    name: "type",
    label: "Type*",
    type: "text",
    list: "type",
    inputClassName: "small-text",
    onKeyDown: (e) => e.preventDefault(),
    required: true,
  },
  {
    name: "course_id",
    label: "Course",
    list: "Course",
    type: "text",
    // inputClassName: "small-text",
  },
  {
    name: "video_id",
    label: "Youtube Video Id",
  },
  {
    name: "exercise_id",
    label: "Exercise Id",
    inputClassName: "small-text",
  },

  {
    name: "material_link",
    label: "Material Link",
  },
];
