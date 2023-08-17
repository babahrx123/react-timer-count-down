import { Component } from "react";
import './CountDown.css'
class CountDown extends Component {
  constructor() {
    super();
    this.state = {
      isTimeRunning: "Start",
      seconds: 0,
    };
    this.hour = 0;
    this.minutes = 5;
  }
  handleOnChangeCountDown = () => {
    let tempSeconds = this.state.seconds;
    let tempMinutes = this.minutes;
    let tempHours = this.hour;

    if (tempSeconds !== 0) {
      tempSeconds -= 1;
    } else if (tempMinutes !== 0) {
      tempMinutes -= 1;
      tempSeconds = 59;
    } else if (tempHours !== 0) {
      tempHours -= 1;
      tempMinutes = 59;
      tempSeconds = 59;
    } else {
      this.handleOnChangeStop();
    }
    this.hour = tempHours;
    this.minutes = tempMinutes;
    this.setState({ seconds: tempSeconds });
  };

  handleOnChangeStart = () => {
    this.setState({ isTimeRunning: "Stop" });
    this.timer = setInterval(() => {
      this.handleOnChangeCountDown();
    }, 1000);
  };
  handleOnChangeStop = () => {
    this.setState({ isTimeRunning: "Start" });
    clearInterval(this.timer);
  };
  handleOnChangeReset = () => {
    this.hour = 0;
    this.minutes = 5;
    this.setState({ seconds: 0 });
    this.handleOnChangeStop();
  };
  handleOnChangeSetSecondsForm = () => {
    this.setState({ isTimeRunning: "SetTime" });
  };
  handleOnChangeConvertSeconds = (tempSeconds) => {
    const hour = Math.floor(tempSeconds / 3600);
    const minutes = Math.floor((tempSeconds - 3600 * hour) / 60);
    tempSeconds = (tempSeconds - 3600 * hour - 60 * minutes) % 60;
    this.hour = hour;
    this.minutes = minutes;
    this.setState({ seconds: tempSeconds });
  };
  handleOnChangeSetTimeSeconds = (event) => {
    event.preventDefault();
    this.handleOnChangeConvertSeconds(parseInt(this.state.seconds));
    this.setState({ isTimeRunning: "Start" });
  };
  render() {
    return (
      <div className="timer">
        <h2>Count Down</h2>
        {this.state.isTimeRunning === "SetTime" ? (
          <form onSubmit={this.handleOnChangeSetTimeSeconds}>
            <label>Enter number of Seconds to set on CountDown Timer</label>
            <input
              type="number"
              onChange={(event) =>
                this.setState({ seconds: event.target.value })
              }
              required
            />
            <button type="submit">SetTime</button>
          </form>
        ) : (
          <div className="timerBody">
            <div className="timerSpan">
                <span>{this.hour < 10 ? `0${this.hour}:` : `${this.hour}:`}</span>
                <span>
                {this.minutes < 10 ? `0${this.minutes}:` : `${this.minutes}:`}
                </span>
                <span>
                {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
                </span>
            </div>
            <br/><br/>
            <div className="timerBtn">
                {this.state.isTimeRunning === "Stop" ? (
                <button onClick={this.handleOnChangeStop}>Stop</button>
                ) : (
                <button onClick={this.handleOnChangeStart}>Start</button>
                )}
                <button onClick={this.handleOnChangeReset}>Reset</button>
                <button onClick={this.handleOnChangeSetSecondsForm}>SetTime</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CountDown;
