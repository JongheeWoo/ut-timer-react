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
    taskDescription: "홈화면 위젯 설정을 바꿔보세요. “공조” 대신에 다른 위젯 정보로 변경해 주세요."
  },
  {
    idx: 2,
    taskNum: "1-2",
    taskDescription: "가운데 위젯과 오른쪽 위젯의 위치를 바꿔주세요."
  },
  {
    idx: 3,
    taskNum: "2",
    taskDescription: "분할화면의 뷰를 “지도”로 바꿔 주세요."
  },
  {
    idx: 4,
    taskNum: "3",
    taskDescription: "사용자 버튼을 누르면 “폰 프로젝션” 메뉴가 바로 켜지도록 설정해 주세요. "
  },
  {
    idx: 5,
    taskNum: "4-1",
    taskDescription: "계기판에 표시되는 정보들 중에 “기어 변속 알림”도 보이게 해 주세요."
  },
  {
    idx: 6,
    taskNum: "4-2",
    taskDescription: "운전석 시트의 온도가 자동으로 맞춰지도록 설정해 주세요."
  },
  {
    idx: 7,
    taskNum: "4-3",
    taskDescription: "충돌 경고로 레벨을 바꿔주세요."
  },
  {
    idx: 8,
    taskNum: "5",
    taskDescription: "제공된 폰을 블루투스로 연결해주세요."
  },
  {
    idx: 9,
    taskNum: "6",
    taskDescription: "뒷좌석의 바람이 아래에서 나오도록 설정해 주시고, 온도는 “19도”로 맞춰주세요."
  },
  {
    idx: 10,
    taskNum: "7",
    taskDescription: "“차로 이탈 방지” 경고음을 줄여주세요."
  },
  {
    idx: 11,
    taskNum: "8",
    taskDescription: "“뒤에서 조작을 할 수 없도록 기능을 잠궈주세요."
  },
];

const taskCarB = [
  {
    idx: 12,
    taskNum: "1-1",
    taskDescription: "홈화면 위젯 설정을 바꿔보세요. “공조” 대신에 “운행 정보”로 변경해 주세요."
  },
  {
    idx: 13,
    taskNum: "1-2",
    taskDescription: "가운데 위젯과 오른쪽 위젯의 위치를 바꿔주세요."
  },
  {
    idx: 14,
    taskNum: "2",
    taskDescription: "분할화면의 뷰를 “지도”로 바꿔 주세요."
  },
  {
    idx: 15,
    taskNum: "3",
    taskDescription: "사용자 버튼을 누르면 “폰 프로젝션” 메뉴가 바로 켜지도록 설정해 주세요. "
  },
  {
    idx: 16,
    taskNum: "4-1",
    taskDescription: "계기판에 표시되는 정보들 중에 “기어 변속 알림”도 보이게 해 주세요."
  },
  {
    idx: 17,
    taskNum: "4-2",
    taskDescription: "운전석 시트의 온도가 자동으로 맞춰지도록 설정해 주세요."
  },
  {
    idx: 18,
    taskNum: "4-3",
    taskDescription: "충돌 경고로 레벨을 바꿔주세요."
  },
  {
    idx: 19,
    taskNum: "5",
    taskDescription: "제공된 폰을 블루투스로 연결해주세요."
  },
  {
    idx: 20,
    taskNum: "6",
    taskDescription: "뒷좌석의 바람이 아래에서 나오도록 설정해 주시고, 온도는 “19도”로 맞춰주세요."
  },
  {
    idx: 21,
    taskNum: "7",
    taskDescription: "“차로 이탈 방지” 경고음을 줄여주세요."
  },
  {
    idx: 22,
    taskNum: "8",
    taskDescription: "뒤에서 조작을 할 수 없도록 기능을 잠궈주세요."
  },
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

