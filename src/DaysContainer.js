import React from "react";
import { Day } from "./Day";

export class DaysContainer extends React.Component {
  render() {
    var fakeDays = [];
    for (var i = 0; i < parseInt(this.props.days[0]["dag i vecka"]) - 1; i++) {
      fakeDays.push(<div key={i} className="fakeday"></div>);
    }
    return (
      <div className="daysWrapper">
        {fakeDays}
        {this.props.days.map((day, index) => {
          return (
            <Day
              closeCalendar={this.props.closeCalendar}
              setInputValue={this.props.setInputValue}
              key={index}
              day={day}
            />
          );
        })}
      </div>
    );
  }
}
