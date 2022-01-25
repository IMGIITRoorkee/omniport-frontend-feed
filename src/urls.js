export function urlFeedList () {
  return `/api/feed/bit/`
}

export function urlBdayTodayList () {
  return `/api/feed/bday-today/`
}
export function urlBdayTomList () {
  return `/api/feed/bday-tom/`
}
export function urlWhoAmI () {
  return `/api/feed/who_am_i/`
}
export function urlBdayList () {
  return `/api/feed/`
}
export function urlFeedBit (id) {
  return `${urlFeedList()}${id}/`
}
