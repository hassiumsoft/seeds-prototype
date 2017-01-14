import * as _ from '../../allActions.js'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import Promise from 'bluebird'
import { getTutorialData, getLevelData } from '../_levelDataHelpers.js'
import setTutorialBoard from './setTutorialBoard.js'
import loadLevelData from './loadLevelData.js'

const autoAt = () => (dispatch, getState, levelSettings) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const {
    subStep,
    data,
    step
  } = state.tutorial
  const { subSteps, board } = getTutorialData(step, data)
  const total = subSteps.length
  const { auto, delay } = subSteps[subStep - 1]
  const lastStep = data.length

  const handleBoard = board && board.step === subStep
    ? _dispatch(setTutorialBoard, board)
    : _dispatch(_.noop)

  if (step === lastStep && subStep === total) {
    const { world, level } = state.level.currentLevel
    const {
      goal,
      probabilities
    } = getLevelData(world, level, levelSettings)
    return dispatch(loadLevelData(goal, probabilities))
  }

  if (total > 0) {
    if (auto) {
      return Promise
        .resolve()
        .then(handleBoard)
        .then(_dispatch(_.setTutorialUpdating, true))
        .then(_dispatch(_.incrementTutorialSubStep))
        .delay(delay)
        .then(_dispatch(autoAt))

    } else if (subStep === total) {
      return Promise
        .resolve()
        .then(handleBoard)
        .then(_dispatch(_.resetTutorialSubStep))
        .then(_dispatch(_.incrementTutorialStep))
        .delay(delay)
        .then(_dispatch(autoAt))

    } else {
      return Promise
        .resolve()
        .then(_dispatch(_.incrementTutorialSubStep))
        .then(_dispatch(_.setTutorialUpdating, false))
    }
  }

}

export default autoAt