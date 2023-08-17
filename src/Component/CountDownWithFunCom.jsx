import { useEffect, useState } from "react";
import "./CountDown.css";

const CountDownWithFunCom = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [hours, setHours] = useState(0);
  const [isTimeRunning, setIsTimerRunning] = useState("Start");

  useEffect(() => {
    if (isTimeRunning === "TRun") {
      const interval = setInterval(() => {
        handleOnChangeSetTimer();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimeRunning, seconds]);

  const handleOnChangeStart = () => {
    setIsTimerRunning("TRun");
  };
  const handleOnChangeSetTimer = () => {
    let tempSeconds = seconds;
    let tempMinutes = minutes;
    let tempHours = hours;
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
      setIsTimerRunning("Stop");
    }

    setSeconds(tempSeconds);
    setMinutes(tempMinutes);
    setHours(tempHours);
  };
  const handleOnChangeStop = () => {
    setIsTimerRunning("Stop");
  };
  const handleOnChangeReset = () => {
    setSeconds(0);
    setMinutes(5);
    setHours(0);
    setIsTimerRunning("Start");
  };
  const handleOnChangeSetTime = (event) => {
    event.preventDefault();
    const tempHours = Math.floor(seconds / 3600);
    const tempMinutes = Math.floor((seconds - tempHours * 3600) / 60);
    const tempSeconds = seconds - tempHours * 3600 - tempMinutes * 60;
    setSeconds(tempSeconds);
    setMinutes(tempMinutes);
    setHours(tempHours);
    setIsTimerRunning("Start");
  };
  const handleOnChangeSetTimeForm = () => {
    setIsTimerRunning("SetTime");
  };
  return (
    <div className="timer">
      <h2>Count Down</h2>
      {isTimeRunning === "SetTime" ? (
        <form onSubmit={handleOnChangeSetTime}>
          <label>Enter number of Seconds to set on CountDown Timer</label>
          <input
            type="number"
            onChange={(event) => setSeconds(parseInt(event.target.value))}
            required
          />
          <button type="submit">SetTime</button>
        </form>
      ) : (
        <div className="timerBody">
          <div className="timerSpan">
            <span>{hours < 10 ? `0${hours}:` : `${hours}:`}</span>
            <span>{minutes < 10 ? `0${minutes}:` : `${minutes}:`}</span>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
          <br />
          <br />
          <div className="timerBtn">
            {isTimeRunning === "TRun" ? (
              <button onClick={handleOnChangeStop}>Stop</button>
            ) : (
              <button onClick={handleOnChangeStart}>Start</button>
            )}

            <button onClick={handleOnChangeReset}>Reset</button>
            <button onClick={handleOnChangeSetTimeForm}>SetTime</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CountDownWithFunCom;
