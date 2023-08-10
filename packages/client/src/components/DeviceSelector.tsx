import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { CANVAS } from '../constants/game'
import Game from './Game'
import switchFullscreen from '../utils/fullscreen'

const DeviceSelector = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const switchFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  function setDimensions() {
    let canvasWidth = CANVAS.width
    let canvasHeight = CANVAS.height

    if (isMobile || fullScreen) {
      canvasWidth = window.innerWidth
      const expectedHeight = Math.floor(window.innerWidth * CANVAS.aspectRatio)
      if (expectedHeight < window.innerHeight) {
        canvasHeight = Math.floor(Math.min(expectedHeight * 1.25, window.innerHeight))
      } else {
        canvasHeight = window.innerHeight
      }
    }

    const element = ref.current
    if (element) {
      element.style.width = canvasWidth + 'px'
      element.style.height = canvasHeight + 'px'
    }
  }

  function fullscreenChange() {
    const isFullscreenMode =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msRequestFullscreen
    // Was pressed Escape
    if (!isFullscreenMode) setFullScreen(false)
    // Switching full screen have delayed animation
    setTimeout(setDimensions, 150)
  }
  useEffect(() => {
    screen.orientation.lock('landscape')
  }, [])

  useEffect(() => {
    const isFullscreenMode =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msRequestFullscreen
    if (!!isFullscreenMode !== fullScreen) switchFullscreen(fullScreen)
    // window.addEventListener('resize', setDimensions)	// Was used in stretch mode
    document.addEventListener('fullscreenchange', fullscreenChange)
    return () => {
      // window.removeEventListener('resize', setDimensions)
      document.removeEventListener('fullscreenchange', fullscreenChange)
    }
  }, [fullScreen])

  return (
    <RootWrapper>
      <GameWrapper ref={ref}>
        <Game fullScreen={fullScreen} switchFullScreen={switchFullScreen} />
      </GameWrapper>
    </RootWrapper>
  )
}

const GameWrapper = styled.div`
  width: ${CANVAS.width}px;
  height: ${CANVAS.height}px;
  position: relative;
  left: 0px;
  top: 0px;
  overflow: clip;

  & canvas {
    width: 100%;
    height: 100%;
  }
`
const RootWrapper = styled.div`
  background-image: linear-gradient(${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

export default DeviceSelector
