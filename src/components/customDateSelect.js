import React, {Component} from 'react';

export class CustomDateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {isExpanded: true};
  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control" type="text" {...this.props}/>
        {this.state.isExpanded && (
          <ul className="nav nav-pills nav-stacked">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Last 4 Hours</a></li>
            <li><a href="#">Last Day</a></li>
            <li><a href="#">Last Month</a></li>
          </ul>
        )}
      </div>
    );
  }
}
