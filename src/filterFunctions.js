export function filterBatch(list, details) {
  return list.filter(function (item) {
    return (
      item.person.student.currentYear == details.student.currentYear &&
      item.person.student.branch.id == details.student.branch.id
    )
  })
}

export function filterYear(list, details) {
  return list.filter(function (item) {
    return item.person.student.currentYear == details.student.currentYear
  })
}

export function filterBhawan(list, details) {
  return list.filter(function (item) {
    return item.person.residentialinformation == details.residentialinformation
  })
}

export function filterIndividualGroup(list, membership) {
  return list.filter(function (item) {
    return item.person.membershipSet.some(val => val == membership)
  })
}

export function filterGroup(list, details) {
  var array = []
  details.membershipSet.map(membership => {
    var temp = filterIndividualGroup(list, membership)
    array = [...array, ...temp]
  })
  const unique = [...new Set(array.map(item => item))]

  return unique
}
