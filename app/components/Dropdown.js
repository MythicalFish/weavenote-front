import React, { PropTypes } from 'react';
import Dot from 'components/Dot';
import PriceSymbol from 'components/PriceSymbol';
import TetherComponent from 'react-tether';

export default class Dropdown extends React.PureComponent {
  state = { active: false, className: '' };

  toggleState = () => {
    this.setState({ active: !this.state.active });
  };

  handleClick = (item) => () => {
    const { readOnly, onChange, onChanged } = this.props;
    if (readOnly) return;
    if (this.state.active) {
      this.setState({ className: '' });
      setTimeout(() => {
        this.toggleState();
        if (item) {
          if (onChange) onChange(item);
          if (onChanged) onChanged(item);
        }
      }, 200);
    } else {
      this.toggleState();
      setTimeout(() => {
        this.setState({ className: 'open' });
      }, 1);
    }
  };

  label = () => {
    const { value, label } = this.props;
    let labelContent;
    if (label) {
      labelContent = label;
    } else {
      let val = value;
      if (!val) val = { name: null };
      if (val.toJS) val = value.toJS();
      labelContent = (
        <div>
          {val.name}
          {val.iso_code &&
            <PriceSymbol code={val.iso_code} className="bold ml1" />}
          {val.hex_code && <Dot className="ml1" color={val.hex_code} />}
          <i className="fa fa-chevron-down dark4 smaller3 ml1" />
        </div>
      );
    }
    return (
      <button onClick={this.handleClick()} type="button">
        {labelContent}
      </button>
    );
  };

  items = () => {
    const { value, data, children, align } = this.props;
    const alignment = align || 'left';
    const itemsClass = `dropdown-options ${alignment}-align ${this.state
      .className}`;
    if (children) {
      return (
        <div className={itemsClass}>
          {children}
        </div>
      );
    }
    let items;
    if (data) {
      items = [];
      data.forEach((item) => {
        if (item === value) return;
        let i = item;
        if (i.toJS) i = i.toJS();
        items.push(
          <li key={item} onClick={this.handleClick(item)}>
            {i.name || i.label}
            {value.iso_code &&
              <PriceSymbol code={i.iso_code} className="bold ml1" />}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </li>
        );
      });
    }
    return (
      <ul className={itemsClass}>
        {items}
      </ul>
    );
  };

  tail = () => {
    const { tail } = this.props;
    if (tail) {
      return tail({
        onClick: () => {
          this.setState({ active: false });
        },
      });
    }
    return null;
  };

  tetherOptions = {
    attachment: 'top right',
    targetAttachment: 'bottom right',
    constraints: [
      {
        to: 'scrollParent',
      },
    ],
  };

  render() {
    const { className, readOnly } = this.props;
    let inputClass = className;
    if (readOnly) inputClass += ' noselect';
    return (
      <div className={`dropdown p0 ${inputClass}`}>
        <TetherComponent {...this.tetherOptions}>
          {this.label()}
          {this.state.active &&
            <div>
              {this.items()}
              {this.tail()}
            </div>}
        </TetherComponent>
      </div>
    );
  }
}

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onChanged: PropTypes.func,
  tail: PropTypes.func,
  readOnly: PropTypes.bool,
  align: PropTypes.string,
  children: PropTypes.node,
  button: PropTypes.node,
};
