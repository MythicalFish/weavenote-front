import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
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

const ProjectAnnotations = (props) => <AnnotationUI {...props} />;

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

export default connect(mapState, mapDispatch)(ProjectAnnotations);
