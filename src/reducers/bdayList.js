const initialState = []

const bdayList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BDAY_LIST':
      return action.payload
  
    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload
      }
    
    default:
      return state

    }
}

export default bdayList
