import { createAction } from 'redux-actions'

// action types
const SET_DRAG = 'SET_DRAG'

// reducer
export default (state = false, action) => {
  switch (action.type) {
  case SET_DRAG:
    return action.payload
  default:
    return state
  }
}

// actions
export const setDrag = createAction(SET_DRAG, x => x)
