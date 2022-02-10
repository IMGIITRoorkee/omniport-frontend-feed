export function filterBatch(list, whoami) {
  return list.filter(function (item) {
    return (
      item.person.student.currentYear == whoami.student.currentYear &&
      item.person.student.branch.id == whoami.student.branch.id
    );
  });

  return list;
}

export function filterYear(list, whoami) {
  return list.filter(function (item) {
    return item.person.student.currentYear == whoami.student.currentYear;
  });

  return list;
}

export function filterBhawan(list, whoami) {
  return list.filter(function (item) {
    return (
      item.person.residentialinformation ==
      whoami.residentialinformation
    );
  });
}

export function filterIndividualGroup(list, membership) {
  return list.filter(function (item) {
    return item.person.membershipSet.some(
      (val) => val === membership
    );
  });
}

export function filterGroup(list, whoami) {
  var array = [];
  whoami.membershipSet.map((membership) => {
    var temp = this.filterIndividualGroup(list, membership);
    array = [...array, ...temp];
  });
  const unique = [...new Set(array.map((item) => item))];

  return unique;
}
