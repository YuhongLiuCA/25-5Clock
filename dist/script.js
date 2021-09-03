/* Important note: Sounds my current React setting on Codepen has some problems, React component function setState not works as expected. So I still use JavaScript variables to handle this which causes extra code.
Will try to use function with useState ot Redux in the future and further investigate React setting.*/
import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
let clockState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  timeName: "Session",
  timeStatus: "stop",
  timerId: "" };

class ClockExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  handleStartStop() {
    if (clockState.timeStatus === 'stop') {

      clockState.timeStatus = 'start';
      clockState.timerId = setInterval(() => {
        this.decreTimer();
      }, 1000);
    } else if (clockState.timeStatus === 'start') {

      if (clockState.timerId != '') {
        clearInterval(clockState.timerId);
        clockState.timerId = '';
      }
      clockState.timeStatus = 'stop';
      clockState.timerId = '';
    }
  }

  decreTimer() {
    if (clockState.timeLeft > 0) {
      clockState.timeLeft = clockState.timeLeft - 1;
      if (clockState.timeLeft == 0) {
        this.audioBeep.play();
      }
      let ele = document.getElementById("time-left");
      ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false });

    } else {
      if (clockState.timeName === "Session") {
        clockState.timeName = "Break";
        clockState.timeLeft = clockState.breakLength * 60;
        let ele1 = document.getElementById("timer-label");
        ele1.innerHTML = clockState.timeName;
        let ele = document.getElementById("time-left");
        ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false }) +
        ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false });

      } else if (clockState.timeName === "Break") {
        clockState.timeName = "Session";
        clockState.timeLeft = clockState.sessionLength * 60;
        let ele1 = document.getElementById("timer-label");
        ele1.innerHTML = clockState.timeName;
        let ele = document.getElementById("time-left");
        ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false }) +
        ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false });

      }
    }
  }
  handleBreakDecrement() {
    if (clockState.breakLength > 1)
    clockState.breakLength--;

    let ele = document.getElementById("break-length");
    ele.innerHTML = clockState.breakLength;
    if (clockState.timeName === "Break") {
      clockState.timeLeft = clockState.breakLength * 60;
      let ele = document.getElementById("time-left");
      ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false });

    }
  }
  handleBreakIncrement() {
    if (clockState.breakLength < 60)
    clockState.breakLength++;
    let ele = document.getElementById("break-length");
    ele.innerHTML = clockState.breakLength;
    if (clockState.timeName === "Break") {
      clockState.timeLeft = clockState.breakLength * 60;
      let ele = document.getElementById("time-left");
      ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false });

    }
  }
  handleSessionDecrement() {
    if (clockState.sessionLength > 1)
    clockState.sessionLength--;
    let ele = document.getElementById("session-length");
    ele.innerHTML = clockState.sessionLength;
    //alert(clockState.timeStatus);
    if (clockState.timeName === "Session") {
      clockState.timeLeft = clockState.sessionLength * 60;
      let ele1 = document.getElementById("time-left");
      ele1.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false });

    }
  }
  handleSessionIncrement() {
    if (clockState.sessionLength < 60)
    clockState.sessionLength++;
    let ele = document.getElementById("session-length");
    ele.innerHTML = clockState.sessionLength;
    if (clockState.timeName === "Session") {
      clockState.timeLeft = clockState.sessionLength * 60;
      let ele = document.getElementById("time-left");
      ele.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false });

    }
  }
  handleReset() {
    if (clockState.timerId != '') {
      clearInterval(clockState.timerId);
      clockState.timerId = '';
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;

    clockState.breakLength = 5;
    clockState.sessionLength = 25;
    clockState.timeLeft = 1500;
    clockState.timeName = "Session";
    clockState.timeState = "stop";
    let ele = document.getElementById("session-length");
    ele.innerHTML = clockState.sessionLength;
    let ele1 = document.getElementById("break-length");
    ele1.innerHTML = clockState.breakLength;
    let ele2 = document.getElementById("time-left");
    ele2.innerHTML = Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false }) +
    ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false });

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "25+5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "clock-panel" }, /*#__PURE__*/
      React.createElement("label", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.handleBreakDecrement }, /*#__PURE__*/React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", class: "bi bi-caret-down-fill", viewBox: "0 0 16 16" }, /*#__PURE__*/
      React.createElement("path", { d: "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" }))), /*#__PURE__*/

      React.createElement("label", { id: "break-length" }, clockState.breakLength), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.handleBreakIncrement }, /*#__PURE__*/React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", class: "bi bi-caret-up-fill", viewBox: "0 0 16 16" }, /*#__PURE__*/
      React.createElement("path", { d: "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" }))), /*#__PURE__*/

      React.createElement("label", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.handleSessionDecrement }, /*#__PURE__*/React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", class: "bi bi-caret-down-fill", viewBox: "0 0 16 16" }, /*#__PURE__*/
      React.createElement("path", { d: "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" }))), /*#__PURE__*/

      React.createElement("label", { id: "session-length" }, clockState.sessionLength), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.handleSessionIncrement }, /*#__PURE__*/React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", class: "bi bi-caret-up-fill", viewBox: "0 0 16 16" }, /*#__PURE__*/
      React.createElement("path", { d: "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" }))), /*#__PURE__*/

      React.createElement("div", { id: "time_p" }, /*#__PURE__*/
      React.createElement("label", { id: "timer-label" }, clockState.timeName), /*#__PURE__*/
      React.createElement("label", { id: "time-left" }, Math.floor(clockState.timeLeft / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }) +
      ':' + (clockState.timeLeft % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false }))), /*#__PURE__*/




      React.createElement("button", { id: "start_stop", onClick: this.handleStartStop }, "Start/Stop"), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset"), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav", preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        } }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(ClockExample, null), document.getElementById("root"));