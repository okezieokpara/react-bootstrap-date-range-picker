import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class PredefinedRangePicker extends Component {
  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" onChange={this.props.onChange}/>
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">@example.com</span>
        </div>
      </div>

    );
  }
  static propTypes = {
    onChange: PropTypes.func
  }
}
