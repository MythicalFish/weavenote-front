import React, { PropTypes } from 'react';
import Dot from 'components/Dot';
import Icon from 'components/Icon';
import PriceSymbol from 'components/PriceSymbol';
import TetherComponent from 'react-tether';
import Focusable from 'utils/Focusable';

class Dropdown extends React.PureComponent {
  state = { className: '' };

  toggleState = (item) => () => {
    const { readOnly, onChange, onChanged } = this.props;
    const { focusThis, unfocusThis, isFocused } = this.props;

    if (readOnly) return;

    if (isFocused) {
      this.setState({ className: '' });
      setTimeout(() => {
        unfocusThis();
        if (item) {
          if (onChange) onChange(item);
          if (onChanged) onChanged(item);
        }
      }, 200);
    } else {
      focusThis();
      setTimeout(() => {
        this.setState({ className: 'open' });
      }, 1);
    }
  };

  label = () => {
    const { value, label, icon } = this.props;
    const bProps = { onClick: this.toggleState(), type: 'button' };

    if (value) {
      let val = value;
      if (!val) val = { name: null };
      if (val.toJS) val = value.toJS();
      return (
        <button {...bProps}>
          <div className="flex justify-between">
            <div className="flex-none">
              {val.name}
              {val.iso_code &&
                <PriceSymbol code={val.iso_code} className="bold ml1" />}
              {val.hex_code && <Dot className="ml1" color={val.hex_code} />}
            </div>
            <div className="flex-none">
              <i className="fa fa-chevron-down smaller3 opa4" />
            </div>
          </div>
        </button>
      );
    } else {
      return (
        <button {...bProps}>
          {label && label}
          {icon && <Icon name={icon} />}
        </button>
      );
    }
  };

  items = () => {
    const { value, data, children, align, tail } = this.props;
    const { className } = this.state;
    const alignment = align || 'left';
    const itemsClass = `dropdown-options ${alignment}-align ${className}`;
    if (children) {
      return (
        <div className={itemsClass} onClick={this.toggleState()}>
          {children}
          {this.tail()}
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
          <button type="button" key={item} onClick={this.toggleState(item)}>
            {i.name || i.label}
            {i.iso_code &&
              <PriceSymbol code={i.iso_code} className="bold ml1" />}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </button>
        );
      });
    }
    return (
      <div className={itemsClass}>
        {items}
        {tail && this.tail()}
      </div>
    );
  };

  tail = () => {
    const { tail } = this.props;
    if (tail) {
      return tail({
        onClick: this.toggleState(),
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
    const { className, readOnly, isFocused, onFocus } = this.props;
    let inputClass = className || '';
    if (readOnly) inputClass += ' noselect';
    return (
      <div className={`dropdown ${inputClass}`} onClick={onFocus}>
        <TetherComponent {...this.tetherOptions}>
          {this.label()}
          {isFocused &&
            <div>
              {this.items()}
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
  icon: PropTypes.string,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  focusThis: PropTypes.func,
  unfocusThis: PropTypes.func,
  label: PropTypes.any,
};

export default Focusable(Dropdown);
