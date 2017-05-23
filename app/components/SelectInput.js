import React, { PropTypes } from 'react';
import Dot from 'components/Dot';
import PriceSymbol from 'components/PriceSymbol';

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { active: false }

  toggleState = () => {
    this.setState({ active: !this.state.active });
  }

  handleClick = (item) => {
    const { onChange, onChanged } = this.props;
    onChange(item);
    this.setState({ active: false });
    if (onChanged) {
      onChanged(item);
    }
  }

  render() {
    const { value, data, className, tail } = this.props;
    let val = value;
    if (val.toJS) { val = val.toJS(); }
    const options = [];

    if (data) {
      data.forEach((item, index) => {
        let i = item;
        if (i.toJS) i = i.toJS();
        options.push((
          <li key={`select-${name}-${index}`} onClick={() => { this.handleClick(item); }}>
            {i.name}
            {val.iso_code && <PriceSymbol code={i.iso_code} className="bold ml1" />}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </li>
        ));
      });
    }

    return (
      <div className={`select-input p0 ${className}`}>
        <button onClick={this.toggleState} type="button">
          {val.name}
          {val.iso_code && <PriceSymbol code={val.iso_code} className="bold ml1" />}
          {val.hex_code && <Dot className="ml1" color={val.hex_code} /> }
        </button>
        {this.state.active &&
          <ul>
            {options}
            {tail &&
              tail({ onClick: () => { this.setState({ active: false }); } })
            }
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
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onChanged: PropTypes.func,
  tail: PropTypes.func,
};
