import React, { useState } from "react";

const initialState = {
  h: "",
  m: "",
  s: ""
};

var timer;

const CountDown = () => {
  const [state, setState] = useState(initialState);
  const [countdownState, setCountdownState] = useState(false);

  const handleChange = (target) => {
    const id = target.id;
    let val = +target.value.slice(0, 2);
    if (val < 10) {
      val = "0" + val;
      val = Number(val);
    }

    if (id === "hour") {
      setState({ ...state, h: val });
    } else if (target.id === "min") {
      setState({ ...state, m: val });
    } else if (target.id === "sec") {
      setState({ ...state, s: val });
    }
  };

  const resetTimer = () => {
    setCountdownState(false);
    setState({ ...state, ...initialState });
    clearInterval(timer);
  };

  const stopTimer = () => {
    setCountdownState(false);
    clearInterval(timer);
  };

  const startTimer = () => {
    setCountdownState(true);

    let hour = state.h;
    let min = state.m;
    let sec = state.s;

    // handling -ve state
    if (sec < 0) {
      sec = 0;
      setState({ ...state, s: sec });
    }
    if (min < 0) {
      min = 0;
      setState({ ...state, m: min });
    }
    if (hour < 0) {
      hour = 0;
      setState({ ...state, h: hour });
    }

    // handling > 60
    if (min > 60) {
      const toHour = sec % 60;
      hour = hour + toHour;
      min = toHour;
    }
    if (sec > 60) {
      const toMin = sec % 60;
      min = min + toMin;
      sec = toMin;
    }

    timer = setInterval(() => {
      if (sec > 0) {
        sec = sec - 1;
        if (sec < 10) {
          sec = "0" + sec;
        }
        setState({ ...state, s: sec, m: min, h: hour });
      }
      if (sec == 0) {
        if (min > 0) {
          sec = Number(59);
          min = min - 1;
          if (min < 10) {
            min = "0" + min;
          }
          setState({ ...state, s: sec, m: min, h: hour });
        }
        if (min == 0) {
          if (hour > 0) {
            min = Number(59);
            hour = hour - 1;
            if (hour < 10) {
              hour = "0" + hour;
            }
            setState({ ...state, s: sec, m: min, h: hour });
          }
        }
      }
    }, 1000);

    if (hour == 0 && min == 0 && sec == 0) {
      clearInterval(timer);
    }
  };

  return (
    <div className="countdown">
      <h1 className="countdown_heading">CountDown</h1>
      <input
        className="countdown_input"
        maxLength="2"
        type="number"
        value={state.h}
        placeholder="00"
        id="hour"
        onChange={(e) => handleChange(e.target)}
        disabled={countdownState}
      />
      <span className="countdown_colon">:</span>
      <input
        className="countdown_input"
        type="number"
        value={state.m}
        placeholder="00"
        id="min"
        onChange={(e) => handleChange(e.target)}
        disabled={countdownState}
      />
      <span className="countdown_colon">:</span>
      <input
        className="countdown_input"
        type="number"
        placeholder="00"
        value={state.s}
        id="sec"
        onChange={(e) => handleChange(e.target)}
        disabled={countdownState}
      />
      <div>
        <button className="countdown_btn countdown_reset" onClick={resetTimer}>
          Reset
        </button>
        <button
          className={`countdown_btn ${
            countdownState ? "countdown_stop" : "countdown_start"
          }`}
          onClick={countdownState ? stopTimer : startTimer}
        >
          {countdownState ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default CountDown;
