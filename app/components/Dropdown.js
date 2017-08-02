import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dot from 'components/Dot';
import PriceSymbol from 'components/PriceSymbol';
import TetherComponent from 'react-tether';
import { selectDropdownID } from 'containers/App/selectors';
import { openDropdown, closeDropdown } from 'containers/App/actions';

class Dropdown extends React.PureComponent {
  state = { className: '', id: null };

  componentDidMount = () => {
    this.setState({ id: this.randomID() });
  };

  randomID() {
    return Math.random().toString(36).substring(7);
  }

  isActive = () => {
    const { dropdownID } = this.props;
    return dropdownID === this.state.id;
  };

  toggleState = (item) => () => {
    const { readOnly, onChange, onChanged } = this.props;
    if (readOnly) return;
    if (this.isActive()) {
      this.setState({ className: '' });
      setTimeout(() => {
        this.props.closeDropdown();
        if (item) {
          if (onChange) onChange(item);
          if (onChanged) onChanged(item);
        }
      }, 200);
    } else {
      this.props.openDropdown(this.state.id);
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
        <div className="flex items-center">
          <div className="flex-auto">
            {val.name}
            {val.iso_code &&
              <PriceSymbol code={val.iso_code} className="bold ml1" />}
            {val.hex_code && <Dot className="ml1" color={val.hex_code} />}
          </div>
          <div className="flex-none">
            <i className="fa fa-chevron-down smaller2" />
          </div>
        </div>
      );
    }
    return (
      <button onClick={this.toggleState()} type="button">
        {labelContent}
      </button>
    );
  };

  items = () => {
    const { value, data, children, align, tail } = this.props;
    const alignment = align || 'left';
    const itemsClass = `dropdown-options ${alignment}-align ${this.state
      .className}`;
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
          <li key={item} onClick={this.toggleState(item)}>
            {i.name || i.label}
            {i.iso_code &&
              <PriceSymbol code={i.iso_code} className="bold ml1" />}
            {i.hex_code && <Dot className="ml1" color={i.hex_code} />}
          </li>
        );
      });
    }
    return (
      <ul className={itemsClass}>
        {items}
        {tail &&
          <li>
            {this.tail()}
          </li>}
      </ul>
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
    const { className, readOnly } = this.props;
    let inputClass = className || '';
    if (readOnly) inputClass += ' noselect';
    return (
      <div className={`dropdown ${inputClass}`}>
        <TetherComponent {...this.tetherOptions}>
          {this.label()}
          {this.isActive() &&
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
  dropdownID: PropTypes.string,
  closeDropdown: PropTypes.func,
  openDropdown: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      openDropdown,
      closeDropdown,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  dropdownID: selectDropdownID(),
});

export default connect(mapState, mapDispatch)(Dropdown);
