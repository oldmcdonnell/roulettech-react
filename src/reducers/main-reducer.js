const JSONStorage = JSON.parse(localStorage.getItem('STATE'));

export const initialMainState = JSONStorage ?? {
  accessToken: '',
  profile: {},
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('STATE', JSON.stringify(state));
};

export const mainReducer = (state = initialMainState, action) => {
  let newState;

  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      newState = { ...state, accessToken: action.accessToken };
      saveStateToLocalStorage(newState);
      return newState;

    case 'SET_PROFILE':
      newState = { ...state, profile: action.profile };
      saveStateToLocalStorage(newState);
      return newState;

    case 'LOGOUT':
      localStorage.removeItem('STATE');
      return {
        accessToken: '',
        profile: {},
      };

    default:
      return state;
  }
};
