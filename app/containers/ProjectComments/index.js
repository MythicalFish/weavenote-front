import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Comments from 'containers/Comments';
import { selectComments } from './selectors';

class ProjectComments extends React.PureComponent {
  render() {
    const { project, comments } = this.props;
    return (
      <Comments
        comments={comments}
        commentable={{ type: 'Project', id: project.get('id') }}
      />
    );
  }
}

ProjectComments.propTypes = {
  project: PropTypes.object,
  comments: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  comments: selectComments(),
});

export default connect(mapState, mapDispatch)(ProjectComments);
