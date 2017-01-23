import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'


const textContent = [
  { text: 'You have embarked on a journey',
    visibleAt: [ 2, 3 ]
  },
  { text: 'Across meadows, and mountains',
    visibleAt: [ 3 ]
  },
  { text: 'To find seeds from our world',
    visibleAt: [ 5, 6 ]
  },
  { text: 'And build a great seed bank',
    visibleAt: [ 6 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay: 600, auto },
    { delay, auto },
    { delay },
    { delay: 600, auto },
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
        {...props}
      />
      <Next
        visibleAt={[ 1, 2, 3, 4, 5, 6, 7 ]}
        {...props}
      />
    </TextContainer>
  )
}