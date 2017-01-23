import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'The rain has stopped',
    className: 'plus-1-5',
    visibleAt: [ 2, 3 ]
  },
  { text: 'Our seeds won\'t grow\n without the right conditions',
    visibleAt: [ 5 ]
  },
  { text: 'How will we continue?',
    className: 'plus-1-5',
    visibleAt: [ 7 ]
  }
]

export const sequence1 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay },
    { delay: 2000, auto },
    { delay, auto },
    { delay, auto },
    { delay },
    { delay, auto }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        visibleAt={[ 3, 4, 5, 6, 7 ]}
        {...props}
      />
    </TextContainer>
  )
}