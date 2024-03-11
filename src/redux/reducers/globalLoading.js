const initialState = {
  status: false,
};

const globalLoading = (state = initialState, action) => {
  switch (action.type) {
    case "CONTROL_LOADING":
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export default globalLoading;
