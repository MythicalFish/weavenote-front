import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection } from 'containers/Projects/selectors';

class NavItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  buttonClass() {
    let c = '';
    if (this.props.currentSection.get('id') === this.props.target.id) {
      c = `${c} active`;
    }
    return c;
  }
  handleClick() {
    this.props.onClick(this.props.target);
  }
  render() {
    return (
      <button className={this.buttonClass()} onClick={() => { this.handleClick(); }}>{this.props.target.label}</button>
    );
  }
}

NavItem.propTypes = {
  target: React.PropTypes.object.isRequired,
  currentSection: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentSection: selectCurrentSection(),
});

export default connect(mapStateToProps)(NavItem);
