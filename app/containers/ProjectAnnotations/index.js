import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getPosition } from 'utils/canvasPosition';
import Canvas from './AnnotationCanvas';
import AnnotationUI from './AnnotationUI';
import { selectUser } from '../App/selectors';
import * as select from './selectors';
import { writeComment } from '../Comments/actions';
import {
  buildAnnotation,
  setAnchor,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
  cancelAnnotation,
  focusAnnotation,
  editLabel,
} from './actions';

const ProjectAnnotations = (props) => {
  const cProps = { onClick: null };
  const canvasClick = ({ evt: e }) => {
    props.setAnchor(getPosition(e, props.canvasSize));
  };
  if (props.isAnnotating) cProps.onClick = canvasClick;
  return <Canvas {...props} {...cProps} />;
};

ProjectAnnotations.propTypes = {
  isAnnotating: PropTypes.bool,
  canvasSize: PropTypes.object,
  setAnchor: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      buildAnnotation,
      setAnchor,
      createAnnotation,
      updateAnnotation,
      deleteAnnotation,
      cancelAnnotation,
      focusAnnotation,
      writeComment,
      editLabel,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  annotations: select.existing(),
  newAnnotation: select.newAnnotation(),
  focusedAnnotation: select.focusedAnnotation(),
  isEditingLabel: select.isEditingLabel(),
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(AnnotationUI(ProjectAnnotations));
