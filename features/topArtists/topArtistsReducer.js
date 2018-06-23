export default function reducer(state = {}, action) {
  switch (action.type) {
    default: return state;
  }
}


/*
export function listRepos(user) {
  return {
    type: GET_REPOS,
    payload: {
      request: {
        url: `/users/${user}/repos`
      }
    }
  };
}
*/