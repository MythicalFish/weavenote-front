import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeSection } from 'containers/Projects/actions';
import NavItem from 'components/NavItem';

class ProjectNavItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleClick(section) {
    this.props.changeSection(section);
    this.props.handleDispatch();
  }
  render() {
    const { target } = this.props;
    return (
      <NavItem target={target} onClick={(section) => { this.handleClick(section); }} />
    );
  }
}

ProjectNavItem.propTypes = {
  target: React.PropTypes.object,
  changeSection: React.PropTypes.func,
  handleDispatch: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeSection: (section) => {
      dispatch(changeSection(section));
    },
  };
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNavItem);
