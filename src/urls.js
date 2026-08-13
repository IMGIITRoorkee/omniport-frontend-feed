export function urlFeedList () {
  return `/api/feed/bit/`
}
export function urlPersonalDetails () {
  return `/api/feed/personal_details/`
}
export function urlBdayList (day) {
  return `/api/feed/birthday/?bdayDay=${day}`
}
export function urlFeedBit (id) {
  return `${urlFeedList()}${id}/`
}
