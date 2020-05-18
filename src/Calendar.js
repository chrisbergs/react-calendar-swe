import React from "react";
import { DaysContainer } from "./DaysContainer";
import "./Calendar.css";

const months = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      year: null,
      month: null,
      days: [],
    };

    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  async getCalendarInfo(year, month) {
    const url = "/dagar/v2.1/" + year + "/" + month;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          year: year,
          month: month,
          days: data.dagar,
        });
      });
  }

  nextYear() {
    this.getCalendarInfo(
      (parseInt(this.state.year) + 1).toString(),
      this.state.month
    );
  }

  prevYear() {
    if (this.state.year > 1910) {
      this.getCalendarInfo(
        (parseInt(this.state.year) - 1).toString(),
        this.state.month
      );
    }
  }

  nextMonth() {
    if (this.state.month === "12") {
      this.getCalendarInfo((parseInt(this.state.year) + 1).toString(), "1");
    } else {
      this.getCalendarInfo(
        this.state.year,
        (parseInt(this.state.month) + 1).toString()
      );
    }
  }

  prevMonth() {
    if (this.state.month === "1") {
      this.getCalendarInfo((parseInt(this.state.year) - 1).toString(), "12");
    } else {
      this.getCalendarInfo(
        this.state.year,
        (parseInt(this.state.month) - 1).toString()
      );
    }
  }

  async componentDidMount() {
    if (this.props.choosenDate) {
      const choosenYear = parseInt(this.props.choosenDate.substr(0, 4));
      const choosenMonth = parseInt(this.props.choosenDate.substr(5, 2));
      await this.getCalendarInfo(choosenYear, choosenMonth);
    } else {
      const todaysDate = new Date();
      const todaysYear = todaysDate.getFullYear().toString();
      const todaysMonth = (todaysDate.getMonth() + 1).toString();
      await this.getCalendarInfo(todaysYear, todaysMonth);
    }
  }

  render() {
    console.log(this.props.offsetTop);
    const style = {
      top: this.props.offsetTop,
      left: this.props.offsetLeft,
      width: this.props.calendarWidth,
    };

    return (
      <div style={style} className="Calendar">
        <div className="yearWrapper">
          <i
            className="Calendar-Button fas fa-chevron-left"
            onClick={this.prevYear}
          ></i>
          <h2>{this.state.year}</h2>
          <i
            className="Calendar-Button fas fa-chevron-right"
            onClick={this.nextYear}
          ></i>
        </div>
        <div className="monthWrapper">
          <i
            className="Calendar-Button fas fa-chevron-left"
            onClick={this.prevMonth}
          ></i>
          <h2>{months[this.state.month - 1]}</h2>
          <i
            className="Calendar-Button fas fa-chevron-right"
            onClick={this.nextMonth}
          ></i>
        </div>
        <div className="Calendar-Line"></div>
        <div className="Calendar-Days-Title">
          <span>MÅ</span>
          <span>TI</span>
          <span>ON</span>
          <span>TO</span>
          <span>FR</span>
          <span>LÖ</span>
          <span>SÖ</span>
        </div>
        {this.state.days.length > 0 ? (
          <DaysContainer
            closeCalendar={this.props.closeCalendar}
            setInputValue={this.props.setInputValue}
            days={this.state.days}
          />
        ) : null}
      </div>
    );
  }
}
