import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      count: 25,
      isRunning: false,
      minutes: 25,
      seconds: 0,
    }
  }

  decrementCount = () => {
    console.log('dec')
    this.setState(prevState => ({
      count: prevState.count - 1,
      minutes: prevState.minutes - 1,
    }))
  }

  incrementCount = () => {
    console.log('inc')
    this.setState(prevState => ({
      count: prevState.count + 1,
      minutes: prevState.minutes + 1,
    }))
  }

  pauseTimer = () => {
    this.setState({
      isRunning: false,
    })

    clearInterval(this.timerId)
  }

  playTimer = () => {
    this.setState({
      isRunning: true,
    })

    this.timerId = setInterval(() => {
      const {minutes, seconds} = this.state

      if (minutes === 0 && seconds === 0) {
        this.setState({
          isRunning: false,
        })
      } else {
        if (seconds === 0) {
          this.setState(prevState => ({
            seconds: 60,
            minutes: prevState.minutes - 1,
          }))
        }

        this.setState(prevState => ({
          seconds: prevState.seconds - 1,
        }))
      }
    }, 1000)
  }

  resetTime = () => {
    const {count} = this.state
    clearInterval(this.timerId)
    this.setState({
      minutes: count,
      seconds: 0,
      isRunning: false,
    })
  }

  render() {
    const {count, isRunning, minutes, seconds} = this.state

    const displayText = isRunning ? 'Running' : 'Paused'

    const incCount = !isRunning && this.incrementCount
    const decCount = !isRunning && this.decrementCount

    let displayMinutes = `${minutes}`
    let displaySeconds = `${seconds}`

    if (minutes < 10) {
      displayMinutes = '0'.concat(minutes)
    }

    if (seconds < 10) {
      displaySeconds = '0'.concat(seconds)
    }

    const pausePlayBtn = isRunning ? (
      <div className="control-option">
        <button type="button" onClick={this.pauseTimer}>
          <img
            className="control-option-icon"
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            alt="pause icon"
          />
          Pause
        </button>
      </div>
    ) : (
      <div className="control-option">
        <button type="button" onClick={this.playTimer}>
          <img
            className="control-option-icon"
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            alt="play icon"
          />
          Start
        </button>
      </div>
    )

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="content-container">
          <div className="timer-container">
            <h1 className="timer-count">
              {displayMinutes}:{displaySeconds}
            </h1>
            <p>{displayText}</p>
          </div>
          <div className="control-container">
            <div className="control-options-container">
              {pausePlayBtn}
              <div className="control-option">
                <button type="button" onClick={this.resetTime}>
                  <img
                    className="control-option-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <h2>Reset</h2>
              </div>
            </div>
            <p>Set Timer limit</p>
            <div className="limit-setter">
              <button type="button" onClick={decCount}>
                -
              </button>
              <p className="timer-value">{count}</p>
              <button type="button" onClick={incCount}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

//   pauseAndPlay = () => {
//     const {isRunning} = this.state

//     this.timerId = null

//     if (!isRunning) {
//       this.timerId = setInterval(() => {
//         this.setState(prevState => ({
//           seconds: prevState.seconds + 1,
//         }))
//       }, 1000)
//     }
//     if (isRunning) {
//       clearInterval(this.timerId)
//     }

//     this.setState(prevState => ({
//       isRunning: !prevState.isRunning,
//     }))
//   }
