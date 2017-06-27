import React, { PropTypes } from 'react';
import Dot from 'components/Dot';
import PriceSymbol from 'components/PriceSymbol';
import TetherComponent from 'react-tether'

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { active: false }

  toggleState = () => {
    if (!this.props.readOnly) {
      this.setState({ active: !this.state.active });
    }
  }

  handleClick = (item) => {
    this.setState({ active: false });
    const { onChange, onChanged } = this.props;
    if (onChange) onChange(item);
    if (onChanged) onChanged(item);
  }

  render() {
    const { value, data, className, tail, align } = this.props;
    let val = value || {};
    let alignment = align || 'left';
    const alignClass = `${alignment}-align`;
    switch (alignment) {
      case 'left':
        alignment = 'right';
        break;
      case 'right':
        alignment = 'left';
        break;
      default:
        break;  
    }
    const attachment = `top ${alignment}`;
    if (val && val.toJS) { val = val.toJS(); }
    const options = [];

    if (data) {
      data.forEach((item, index) => {
        if (item === value) return;
        let i = item;
        if (i.toJS) i = i.toJS();
        options.push((
          <li key={`select-${name}-${index}`} onClick={() => { this.handleClick(item); }}>
            {i.name || i.label}
            {val.iso_code && <PriceSymbol code={i.iso_code} className="bold ml1" />}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </li>
        ));
      });
    }

    return (
      <div className={`select-input p0 ${className}`}>
        <TetherComponent
          attachment={attachment}
          constraints={[{
            to: 'scrollParent',
            //attachment: 'together',
          }]}
        >
          <button onClick={this.toggleState} type="button">
            {val.name}
            {val.iso_code && <PriceSymbol code={val.iso_code} className="bold ml1" />}
            {val.hex_code && <Dot className="ml1" color={val.hex_code} />}
          </button>
          {this.state.active &&
            <ul className={`select-input-options ${alignClass}`}>
              {options}
              {tail &&
                tail({ onClick: () => { this.setState({ active: false }); } })
              }
            </ul>
          }
        </TetherComponent>
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
  readOnly: PropTypes.bool,
  align: PropTypes.string,
};
