import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Comments from 'containers/Comments';
import { buildAnnotation } from 'containers/ProjectAnnotations/actions';
import { selectComments } from './selectors';

class ProjectComments extends React.PureComponent {
  render() {
    const { project } = this.props;
    return (
      <Comments
        {...this.props}
        commentable={{ type: 'Project', id: project.get('id') }}
      />
    );
  }
}

ProjectComments.propTypes = {
  project: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      buildAnnotation,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  comments: selectComments(),
});

export default connect(mapState, mapDispatch)(ProjectComments);
