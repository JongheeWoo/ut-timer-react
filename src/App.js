import React, { Component } from "react";
import "./App.css";
import GlobalTimeView from "./components/GlobalTimeView";
import Controls from "./components/Controls";
import SelectUser from "./components/SelectUser";
import LocalTimer from "./components/LocalTimer";
import Tabs from "./Tabs";

const tasks_car_a = [
  {
    idx: 1,
    taskNum: "1-1",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 2,
    taskNum: "1-2",
    taskDescription: "홈 위젯 메뉴의 위치 변경하기"
  },
  {
    idx: 3,
    taskNum: "2",
    taskDescription: "분할화면에 다른 것이 보이도록 바꿔주세요."
  },
  {
    idx: 4,
    taskNum: "3",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 5,
    taskNum: "4",
    taskDescription: "계기판 표시 정보"
  },
  {
    idx: 6,
    taskNum: "5",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 7,
    taskNum: "6",
    taskDescription: "홈 위젯 메뉴 변경하기"
  }
];

const tasks_car_b = [
  {
    idx: 1,
    taskNum: "7 Series 1-1",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 2,
    taskNum: "1-2",
    taskDescription: "홈 위젯 메뉴의 위치 변경하기"
  },
  {
    idx: 3,
    taskNum: "2",
    taskDescription: "분할화면에 다른 것이 보이도록 바꿔주세요."
  },
  {
    idx: 4,
    taskNum: "3",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 5,
    taskNum: "4",
    taskDescription: "계기판 표시 정보"
  },
  {
    idx: 6,
    taskNum: "5",
    taskDescription: "홈 위젯 메뉴 변경하기"
  },
  {
    idx: 7,
    taskNum: "6",
    taskDescription: "홈 위젯 메뉴 변경하기"
  }
];

let s = 0;

class App extends Component {
  state = {
    time: 0,
    isRunning: false
  };

  start = () => {
    console.log("Start Clicked");
    if (this.state.isRunning === false) {
      this.setState({ time: this.state.time, isRunning: true });
      this.timer = setInterval(() => {
        this.setState({ time: s++ });
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
        <header className="Header">
          <h1>AVN UT TIMER</h1>
          <SelectUser />
        </header>
        <Tabs>
          <div label="KIA K900">
            <div className="GlobalTime">
              <GlobalTimeView time={this.state.time} />
              <div className="GlobalControl">
                <Controls
                  isRunning={this.state.isRunning}
                  start={() => this.start()}
                  stop={() => this.stop()}
                  reset={() => this.reset()}
                />
              </div>
            </div>

            <div>
              {tasks_car_a.map(localtimer => (
                <LocalTimer
                  time={this.state.time}
                  taskNum={localtimer.taskNum}
                  taskDescription={localtimer.taskDescription}
                  key={localtimer.idx}
                />
              ))}
            </div>
          </div>
          <div label="BMW 7 Series">
            <div className="GlobalTime">
              <GlobalTimeView time={this.state.time} />
              <Controls
                isRunning={this.state.isRunning}
                start={() => this.start()}
                stop={() => this.stop()}
                reset={() => this.reset()}
              />
            </div>

            <div>
              {tasks_car_b.map(localtimer => (
                <LocalTimer
                  time={this.state.time}
                  taskNum={localtimer.taskNum}
                  taskDescription={localtimer.taskDescription}
                  key={localtimer.idx}
                />
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
