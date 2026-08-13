export const getStudentBranch = student => {
  let branch = ''
  if (student && student.branch && student.branch.name) {
    branch = student.branch.name
  }
  return branch
}

export const getStudentYearVerbose = student => {
  let year = ''
  if (student && student.currentYear) {
    year = student.currentYear
  }
  return year
}