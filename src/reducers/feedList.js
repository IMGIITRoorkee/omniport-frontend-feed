const initialState = {
  isLoaded: false,
  list: {}
}

const feedList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FEED_LIST':
      return action.payload
    case 'SET_FEED_LIST_NEXT_PAGE':
      return {
        ...action.payload,
        list: {
          ...action.payload.list,
          results: [...state.list.results, ...action.payload.list.results]
        }
      }
    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload
      }
    case 'SET_REPORTED':
      return {
        ...state,
        list: {
          ...state.list,
          results: state.list.results.map(x => {
            if (x.id !== action.payload.id) {
              return x
            }
            return action.payload
          })
        }
      }
    default:
      return state
  }
}

export default feedList
