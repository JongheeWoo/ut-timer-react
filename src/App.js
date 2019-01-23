import React, { Component } from "react";
import "./App.css";
import GlobalTimeView from "./components/GlobalTimeView";
import Controls from "./components/Controls";
import SelectUser from "./components/SelectUser";
import LocalTimer from "./components/LocalTimer";

const tasks = [
  {
    taskNum: "1-1",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    taskNum: "1-2",
    taskDescription: "홈 위젯 메뉴의 위치 변경하기"
  },
  {
    taskNum: "2",
    taskDescription: "분할화면에 다른 것이 보이도록 바꿔주세요."
  },
  {
    taskNum: "3",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    taskNum: "4",
    taskDescription: "계기판 표시 정보"
  },
  {
    taskNum: "5",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    taskNum: "6",
    taskDescription: "홈 위젯 메뉴 변경하기"
  }
];

let ms = 0;
let s = 0;
let m = 0;

class App extends Component {
  state = {
    time: `${m}:${s}:${ms}`,
    isRunning: false
  };
  start = () => {
    console.log("Start Clicked");
    if (this.state.isRunning === false) {
      this.setState({ time: this.state.time, isRunning: true });
      this.timer = setInterval(() => {
        this.setState({ time: ms++ });
      }, 100);
    }
  };

  stop = () => {
    if (this.state.isRunning === true) {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    }
  };

  save = () => {
    console.log(this.state.time);
  };

  reset = () => {
    this.setState({ time: 0, isRunning: false });
    s = 0;
  };

  render() {
    return (
      <div className="App">
        <header className="">
          AVN UT TIMER
          <SelectUser />
        </header>
        <div className="GlobalTime">
          <GlobalTimeView time={this.state.time} />
          <Controls
            isRunning={this.state.isRunning}
            start={() => this.start()}
            stop={() => this.stop()}
            reset={() => this.reset()}
          />
        </div>
        <div className="LocalTimer">
          {tasks.map(localtimer => (
            <LocalTimer
              taskNum={localtimer.taskNum}
              taskDescription={localtimer.taskDescription}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
