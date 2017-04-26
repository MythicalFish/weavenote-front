import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentSection } from 'containers/Projects/selectors';

class NavigationItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  status() {
    // if currentSection == this.props.path
    // active
  }
  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

NavigationItem.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  currentSection: makeSelectCurrentSection(),
});

export default connect(mapStateToProps)(NavigationItem);
