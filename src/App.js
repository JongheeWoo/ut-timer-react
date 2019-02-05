import React, { Component } from "react";
import "./App.css";
import GlobalTimeView from "./components/GlobalTimeView";
import Controls from "./components/Controls";
import SelectUser from "./components/SelectUser";
import LocalTimer from "./components/LocalTimer";
import Tabs from "./Tabs";
import LoginBtn from "./components/LoginBtn";

const taskCarA = [
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

const taskCarB = [
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

const formattedSeconds = sec =>
  ("0" + Math.floor(sec / 60)).slice(-2) + ":" + ("0" + (sec % 60)).slice(-2);

let s = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  id = 0;

  state = {
    time: 0,
    isRunning: false,
    records: [],
    userNo: "User Not Selected",
    carType: "KIA K900"
  };

  updateUser = data => {
    this.setState({
      userNo: data
    });
    console.log(`parent after: ${this.state.userNo}`);
  };

  updateCarType = data => {
    this.setState({
      carType: data
    });
    console.log(`parent type: ${data}`);
  };

  updateData = (data, index) => {
    var values = [
      [
        "" + data.user,
        "" + data.carType,
        "" + data.taskNum,
        "" + data.localTime,
        "" + data.globalTime
      ]
    ];
    var body = {
      values: values
    };
    console.log(values);
    window.gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: "1Xm5Hw8sOPM7RshP4aaG738mcdKIHG4AMbOyWBtgCd_0",
        // range: "User One!A" + index + ":D" + index,
        range: `${this.state.userNo}!A${index}:E${index}`,
        valueInputOption: "RAW",
        resource: body
      })
      .then(response => {
        console.log(response);
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
      });
    this.setState({
      records: this.state.records.concat({ ...data, id: this.id++ })
    });
    console.log(data);
  };

  start = () => {
    console.log("Start Clicked");
    if (this.state.isRunning === false) {
      this.setState({ time: this.state.time, isRunning: true });
      this.timer = setInterval(() => {
        this.setState({ time: s++ });
      }, 1000);
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
    console.log("Global Reset");
    s = 0;
  };

  listMajors = () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1Xm5Hw8sOPM7RshP4aaG738mcdKIHG4AMbOyWBtgCd_0",
        range: "Class Data!A2:E"
      })
      .then(
        response => {
          var range = response.result;
          console.log(range);
          let result = [];
          if (range.values.length > 0) {
            result = ["Task, Lcoal, Global:"];

            for (let i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              result = [...result, row[0] + ", " + row[4]];
            }
          } else {
            result = [...result, "No data found."];
          }
          console.log(result);
          this.setState({
            records: result
          });
        },
        response => {
          // NOTHING
        }
      );
  };

  render() {
    return (
      <div className="App">
        <header className="Header">
          <div className="HeaderTop">
            <h1>AVN UT TIMER</h1>
            <LoginBtn />
          </div>
          <div className="testMetaInfo">
            <div>
              {this.state.userNo} | {this.state.carType}
            </div>
            <div className="select-user">
              <SelectUser onCreate={this.updateUser} />
            </div>
          </div>
        </header>
        <Tabs onUpdate={this.updateCarType}>
          <div label="KIA K900">
            <div className="GlobalTime">
              <GlobalTimeView time={formattedSeconds(this.state.time)} />
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
              {taskCarA.map(localtimer => (
                <LocalTimer
                  ref={this.child}
                  user={this.state.userNo}
                  car={this.state.carType}
                  onUpdate={this.updateData}
                  time={this.state.time}
                  taskNum={localtimer.taskNum}
                  taskDescription={localtimer.taskDescription}
                  index={localtimer.idx}
                  key={localtimer.idx}
                />
              ))}
            </div>
          </div>
          <div label="BMW 7 Series">
            <div className="GlobalTime">
              <GlobalTimeView time={formattedSeconds(this.state.time)} />
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
              {taskCarB.map(localtimer => (
                <LocalTimer
                  ref={this.child}
                  user={this.state.userNo}
                  car={this.state.carType}
                  onUpdate={this.updateData}
                  time={this.state.time}
                  taskNum={localtimer.taskNum}
                  taskDescription={localtimer.taskDescription}
                  index={localtimer.idx}
                  key={localtimer.idx}
                />
              ))}
            </div>
          </div>
        </Tabs>
        <button onClick={this.listMajors}>load</button>
        {JSON.stringify(this.state.records)}
      </div>
    );
  }
}

export default App;
