import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

class Comments extends React.PureComponent {
  render() {
    return (
      <div>
        comments!
        {this.props.children}
      </div>
    );
  }
}

Comments.propTypes = {
  children: PropTypes.node,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Comments);
