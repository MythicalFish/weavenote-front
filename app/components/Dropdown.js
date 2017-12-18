import React, { PropTypes } from 'react';
import Dot from 'components/Dot';
import Icon from 'components/Icon';
import PriceSymbol from 'components/PriceSymbol';
import Dots from 'images/dots-vertical.svg';
import TetherComponent from 'react-tether';
import sizeMe from 'react-sizeme';
import Focusable from 'utils/Focusable';
import { elementPosition } from 'utils/misc';

class Dropdown extends React.PureComponent {
  toggleState = (item) => () => {
    const { readOnly, onChange, onChanged } = this.props;
    const { focusThis, unfocusThis, isFocused } = this.props;

    if (readOnly) return;

    if (isFocused) {
      if (item) {
        if (onChange) onChange(item);
        if (onChanged) onChanged(item);
      }
      unfocusThis();
    } else {
      focusThis();
    }
  };

  label = () => {
    const { value, label, icon, readOnly } = this.props;
    const bProps = { onClick: this.toggleState(), type: 'button' };

    if (label || icon) {
      bProps.className = 'p0';
      let I;
      if (icon) {
        if (icon === 'more') {
          I = (
            <img
              src={Dots}
              style={{ height: 'auto', opacity: 0.4, width: '5px' }}
            />
          );
        } else {
          I = <Icon name={icon} />;
        }
      }
      return (
        <button {...bProps}>
          {label && label}
          {I}
        </button>
      );
    }

    let val = value;
    if (!val) val = { name: null };
    if (val.toJS) val = value.toJS();
    return (
      <button {...bProps}>
        <div className="flex justify-between">
          <div className="flex-none">
            {val.name || val.label}
            {val.iso_code && (
              <PriceSymbol code={val.iso_code} className="bold ml1" />
            )}
            {val.hex_code && <Dot className="ml1" color={val.hex_code} />}
          </div>
          {!readOnly && (
            <div className="flex-none">
              <i className="fa fa-chevron-down smaller3 opa4" />
            </div>
          )}
        </div>
      </button>
    );
  };

  items = () => {
    let klass = 'dropdown-options';
    const {
      value,
      data,
      children,
      align,
      tail,
      focusClass,
      matchWidth,
      size,
      tether,
    } = this.props;
    const useTether = tether !== false;
    if (useTether && this.isNearBottom()) klass += ' near-bottom';
    if (focusClass) klass += ` ${focusClass}`;
    const iProps = {
      className: klass,
      style: {
        textAlign: align || 'left',
        width: matchWidth ? size.width : 'auto',
      },
    };
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
            {i.iso_code && (
              <PriceSymbol code={i.iso_code} className="bold ml1" />
            )}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </button>
        );
      });
    }
    return (
      <div {...iProps}>
        {items || children}
        {tail && tail()}
      </div>
    );
  };
  isNearBottom = () => {
    if (!this.ref) return false;
    const rect = this.ref.getBoundingClientRect();
    const pos = rect.top + rect.height + 180;
    return pos >= window.innerHeight;
  };
  tetherOptions = () => {
    const opts = {
      attachment: 'top right',
      targetAttachment: 'bottom right',
      constraints: [
        {
          to: 'scrollParent',
        },
      ],
    };
    if (this.isNearBottom()) {
      opts.attachment = 'bottom right';
      opts.targetAttachment = 'top right';
    }
    return opts;
  };
  handleRef = (ref) => {
    this.ref = ref;
  };
  render() {
    const { className, readOnly, isFocused, onFocus, tether } = this.props;
    let klass = 'dropdown';
    if (className) klass += ` ${className}`;
    if (readOnly) klass += ' noselect';
    const useTether = tether !== false;
    return (
      <div className={klass} onClick={onFocus} ref={this.handleRef}>
        {useTether ? (
          <TetherComponent {...this.tetherOptions()}>
            {this.label()}
            {isFocused && this.items()}
          </TetherComponent>
        ) : (
          <div className="untethered">
            {this.label()}
            {isFocused && this.items()}
          </div>
        )}
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
  tether: PropTypes.bool,
  align: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  focusThis: PropTypes.func,
  unfocusThis: PropTypes.func,
  label: PropTypes.any,
  focusClass: PropTypes.string,
  matchWidth: PropTypes.bool,
  size: PropTypes.object,
};

export default sizeMe()(Focusable(Dropdown));
