export const mapCourses = (courses) => {
  const enrolledCourses = courses.enrolledCourses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
    }
  })

  const allCourses  = courses.allCourses.map((course) => {
    return {
      id: course.id,
      name: course.name,
      logo: course.logo,
      description: course.short_description,
    }
  })

  return {
    enrolledCourses,
    allCourses
  }
} 
