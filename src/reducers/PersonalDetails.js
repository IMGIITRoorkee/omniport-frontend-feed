const initialState = {
  isLoaded: false,
  details: {}
}

const personalDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PERSONAL_DETAILS':
      return action.payload

    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      }

    default:
      return state
  }
}

export default personalDetails
