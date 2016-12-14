import React from 'react'
import Board from './Board/Board.js'
import Hub from './Hub/Hub.js'
import TitleScreen from './TitleScreen.js'
import Loading from './Loading.js'
import Intro from './Intro.js'
import Audio from './Audio.js'
import RainCurtain from './RainCurtain.js'

import { connect } from 'react-redux'
import { setView, playAudio, stopAudio } from '../redux/allActions.js'
import flashLoadingScreen from '../redux/actionSequences/flashLoadingScreen.js'
import { identity } from 'ramda'

import '../../scss/index.scss'

class App extends React.Component {
  router () {
    const viewMap = {
      title: <TitleScreen />,
      board: <Board />,
      intro: <Intro />,
      hub: <Hub />
    }
    return viewMap[this.props.view]
  }

  loadView (view) {
    this.props.flashLoadingScreen(Math.random())
    setTimeout(() => this.props.setView(view), 1800)
  }

  renderLoadingScreen () {
    const { seedType } = this.props.level
    const { visible, background } = this.props.loadingScreen
    return visible
      ? <Loading background={background} seedType={seedType} />
      : ''
  }

  handleFixedBackground (view, loading) {
    return view !== 'hub' || loading
      ? (e) => e.preventDefault()
      : identity
  }

  render () {
    const { raindropsVisible } = this.props.level.weather
    const { backdrop, view, loadingScreen: { visible } } = this.props
    return (
      <div
        onTouchMove={this.handleFixedBackground(view, visible)}
        className={'backdrop ' + backdrop}
      >
        {this.renderLoadingScreen()}
        <div className='menu'>
          <p className='menu-item' onClick={() => this.loadView('title')}>Intro</p>
          <p className='menu-item' onClick={() => this.loadView('board')}>Board</p>
          <p className='menu-item' onClick={() => this.loadView('hub')}>Hub</p>
        </div>
        <Audio />
        {this.router()}
        <RainCurtain raindropsVisible={raindropsVisible} />
        <div className='audio-controls'>
          <p className='menu-item' onClick={this.props.playAudio}>play</p>
          <p className='menu-item' onClick={this.props.stopAudio}>pause</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { setView, flashLoadingScreen, stopAudio, playAudio })(App)
