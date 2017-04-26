import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeSection } from 'containers/Projects/actions';
import NavItem from 'components/NavItem';

class ProjectNavItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { target, onClick } = this.props;
    return (
      <NavItem target={target} onClick={(section) => { onClick(section); }} />
    );
  }
}

ProjectNavItem.propTypes = {
  target: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClick: (section) => dispatch(changeSection(section)),
  };
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNavItem);
