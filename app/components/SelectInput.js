import React, { PropTypes } from 'react';
import Dot from 'components/Dot';

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { active: false }

  toggleState = () => {
    this.setState({ active: !this.state.active });
  }

  handleClick(item) {
    this.props.onChange(item);
    this.setState({ active: false });
  }

  render() {
    const { value, data, className } = this.props;
    let val = value;
    if (val.toJS) { val = val.toJS(); }

    const options = data.map((item, index) => (
      <li key={`select-${name}-${index}`} onClick={() => { this.handleClick(item); }}>
        {item.name}
        {item.hex_code && <Dot className="ml1" color={item.hex_code} /> }
      </li>
    ));

    return (
      <div className={`select-input p0 ${className}`}>
        <button onClick={this.toggleState} type="button">
          {val.name}
          {val.hex_code && <Dot className="ml1" color={val.hex_code} /> }
        </button>
        {this.state.active &&
          <ul>
            {options}
          </ul>
        }
      </div>
    );
  }
}

SelectInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  data: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
