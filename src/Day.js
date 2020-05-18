import React from "react";

export class Day extends React.Component {
  constructor(props) {
    super(props);

    this.test = this.test.bind(this);
  }

  test() {
    this.props.setInputValue(this.props.day.datum);
    this.props.closeCalendar();
  }

  render() {
    return (
      <div className="day">
        <li onClick={this.test}>
          {this.props.day.datum[8] === "0"
            ? this.props.day.datum[9].toString()
            : this.props.day.datum[8].toString() +
              this.props.day.datum[9].toString()}
        </li>
      </div>
    );
  }
}
