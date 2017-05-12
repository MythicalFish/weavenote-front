import React, { PropTypes } from 'react';
import Dot from 'components/Dot';

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  toggleMenu = () => {
    this.setState({ active: !this.state.active });
  }

  handleClick(item) {
    const { input } = this.props;
    input.onChange(item);
    this.setState({ active: false });
  }

  render() {
    const { input, data, className } = this.props;
    let val = input.value;
    if (val.toJS) { val = val.toJS(); }

    const options = data.map((item, index) => (
      <li key={`select-${input.name}-${index}`} onClick={() => { this.handleClick(item); }}>
        {item.name}
        {item.hex_code && <Dot className="ml1" color={item.hex_code} /> }
      </li>
    ));

    return (
      <div className={`select-input p0 ${className}`}>
        <button onClick={this.toggleMenu} type="button">
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
  input: PropTypes.object,
  data: PropTypes.array,
  className: PropTypes.string,
};
