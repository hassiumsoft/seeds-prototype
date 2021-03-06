import React from 'react'
import ReactDOM from 'react-dom'

export default class Level extends React.PureComponent {
  componentDidMount () {
    const { levelNumber, levelProgress } = this.props
    const $el = ReactDOM.findDOMNode(this.level)
    if (levelNumber === levelProgress) {
      const windowHeight = window.innerHeight
      setTimeout(() => window.scrollBy(0, $el.offsetTop - windowHeight / 2), 300)
    }
  }

  render () {
    const {
      offset: { x: levelX, y: levelY },
      trail: {
        img: trailImg,
        rotate: trailRotate,
        offset: { x: trailX, y: trailY }
      },
      levelNumber,
      levelProgress,
      avatars,
      world,
      startLevel
    } = this.props

    const isComplete = levelProgress > levelNumber
    const isCurrentLevel = levelProgress === levelNumber

    const numberActiveClass = isComplete || isCurrentLevel
      ? 'active'
      : ''

    const levelAvatar = isComplete
      ? `img/seeds/${avatars[0]}/${avatars[0]}.svg`
      : 'img/outlines/teardrop-seed-outline.svg'

    const trailStyles = {
      transform:
       `translate(${trailX}em, ${trailY}em)
        rotate(${trailRotate}deg)`
    }

    const renderTrail = isComplete && trailImg
      ? <img className='trail'
        style={trailStyles}
        src={`img/trails/${trailImg}`}
        />
      : ''

    const renderPointer = isCurrentLevel
      ? <img className='pointer' src='img/triangle.svg' />
      : ''

    return (
      <div
        ref={($el) => this.level = $el}
        className={'hub-level offset-x-' + levelX + ' offset-y-' + levelY}
        onClick={() => startLevel(world, levelNumber)}
      >
        {renderTrail}
        {renderPointer}
        <img className='hub-level-avatar' src={levelAvatar} />
        <div className={'hub-level-number ' + numberActiveClass + ' world-' + world}>
          <p>{levelNumber}</p>
        </div>
      </div>
    )
  }
}
