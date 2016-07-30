import { createSelector } from 'reselect'
import { booleanArray, transformBoard } from '../model/model.js'
import { falseBoard } from '../model/constants.js'

const getMoveArray = (state) => state.moves.moveArray
const getBoard = (state) => state.board
const defaultState = falseBoard

const isDraggingArray = createSelector(
  [ getMoveArray, getBoard ],
  (moveArray, board) =>
    moveArray.length > 0 ?
      booleanArray(transformBoard(moveArray, board, 0)) :
      defaultState
)

export default isDraggingArray
