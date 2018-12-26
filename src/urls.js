export function urlFeedList () {
  return `/api/feed/bit/`
}

export function urlFeedBit (id) {
  return `${urlFeedList()}${id}/`
}
