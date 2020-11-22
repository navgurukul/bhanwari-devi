
export const CLASS_FORM_FIELDS = [
  {
    id: 'title',
    name: 'title',
    label: 'Title*',
    required: true,
  },
  {
    name: 'description',
    label: 'Description*',
    type: 'textarea',  
    required: true,
  },
  {
    name: 'facilitator_name',
    label: 'Facilator Name*',
    required: true,
  },
  {
    name: 'facilitator_email',
    label: 'Facilator Email*',
    type: 'email',
    required: true,
  },
  {
    // "start_time": "2020-11-22",
    name: 'start_time',
    label: 'start Date*',
    type: 'date',
    inputClassName: 'small-text',
    required: true,
  },
  {
    //"end_time": "2020-11-22",
    name: 'end_time',
    label: 'End Date*',
    type: 'date',
    inputClassName: 'small-text',
    required: true,
  },
  {
    name: 'video_id',
    label: 'Youtube Video Id',
  },

  {
    name: 'exercise_id',
    label: 'Exercise Id',
    inputClassName: 'small-text',
  },
  {
    name: 'course_id',
    label: 'Course Id',
    inputClassName: 'small-text',
  },
  {
    name: 'category_id',
    label: 'Category Id*',
    type: 'text',
    list: 'category',
    inputClassName: 'small-text',
    required: true,
  },
  {
    name: 'lang',
    label: 'Language*',
    type: 'text',
    list: 'language',
    inputClassName: 'small-text',
    required: true,
  },
  {
    name: 'type',
    label: 'Type*',
    type: 'text',
    list: 'type',
    inputClassName: 'small-text',
    required: true,
  },  
]
