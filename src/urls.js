export function urlFeedList () {
  return `/api/feed/bit/`
}
export function urlPersonalDetails () {
  return `/api/feed/personal_details/`
}
export function urlBdayList () {
  return `/api/feed/birthday/`
}
export function urlFeedBit (id) {
  return `${urlFeedList()}${id}/`
}
