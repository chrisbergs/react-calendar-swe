import Calendar from "./Calendar";
import "./Input.css";

import React from "react";

export class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      calendarVisible: false,
      choosenDate: "",
      offsetTop: null,
      offsetLeft: null,
      calendarWidth: null,
    };
    this.showCalendar = this.showCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
  }

  closeCalendar() {
    this.setState({ calendarVisible: false });
  }

  showCalendar() {
    const Input = document.querySelector(".Calendar-Input");
    const InputOffsetTop = Input.offsetTop;
    const InputHeight = Input.offsetHeight;
    const InputWidth = Input.offsetWidth;
    const InputOffsetLeft = Input.offsetLeft;

    this.setState({
      calendarVisible: true,
      offsetTop: InputOffsetTop + InputHeight + 5,
      offsetLeft: InputOffsetLeft,
      calendarWidth: InputWidth,
    });
  }

  setInputValue(value) {
    this.setState({
      choosenDate: value,
    });
  }

  render() {
    return (
      <div className="Calendar-Input-Wrapper">
        {this.state.calendarVisible ? (
          <Calendar
            calendarWidth={this.state.calendarWidth}
            offsetLeft={this.state.offsetLeft}
            offsetTop={this.state.offsetTop}
            closeCalendar={this.closeCalendar}
            setInputValue={this.setInputValue}
            choosenDate={this.state.choosenDate}
          />
        ) : null}
        <input
          className="Calendar-Input"
          onFocus={this.showCalendar}
          value={this.state.choosenDate || ""}
          onChange={this.closeCalendar}
          type="text"
        ></input>
      </div>
    );
  }
}
