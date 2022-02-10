const initialState = {};

const whoami = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WHO_AM_I':
      return action.payload;

    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };

    default:
      return state;
  }
};

export default whoami;
