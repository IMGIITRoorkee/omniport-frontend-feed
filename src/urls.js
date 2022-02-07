export function urlFeedList () {
  return `/api/feed/bit/`
}
export function urlWhoAmI () {
  return `/api/feed/who_am_i/`
}
export function urlBdayList () {
  return `/api/feed/birthday/`
}
export function urlFeedBit (id) {
  return `${urlFeedList()}${id}/`
}
