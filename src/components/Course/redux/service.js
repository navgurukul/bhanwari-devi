export const mapCourses = (courses) => {
  return courses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
    }
  })
} 
