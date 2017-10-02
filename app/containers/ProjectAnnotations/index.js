import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Canvas from 'components/Canvas';
import AnnotationUI from './AnnotationUI';
import Annotation from './Annotation';
import { selectUser } from '../App/selectors';
import {
  selectExisting,
  selectNewAnnotation,
  selectFocusedAnnotation,
} from './selectors';
import { writeComment } from '../Comments/actions';
import { getPosition } from './utils';
import {
  buildAnnotation,
  setAnchor,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
  cancelAnnotation,
  focusAnnotation,
} from './actions';

class ProjectAnnotations extends React.PureComponent {
  canvasClick = ({ evt: e }) => {
    const { setAnchor: set, canvasSize } = this.props;
    set(getPosition(e, canvasSize));
  };
  render() {
    const { annotations, canvasSize, imageID, newAnnotation } = this.props;
    const cProps = { size: canvasSize };
    if (this.props.isAnnotating) cProps.onClick = this.canvasClick;
    return (
      <Canvas {...cProps}>
        {annotations
          .filter((a) => a.get('image_id') === imageID)
          .map((annotation, index) => (
            <Annotation
              key={`Annotation${index}`}
              annotation={annotation}
              {...this.props}
            />
          ))}
        {this.props.isAnnotating && (
          <Annotation annotation={newAnnotation} {...this.props} />
        )}
      </Canvas>
    );
  }
}

ProjectAnnotations.propTypes = {
  imageID: PropTypes.number,
  annotations: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  isAnnotating: PropTypes.bool,
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
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  annotations: selectExisting(),
  newAnnotation: selectNewAnnotation(),
  focusedAnnotation: selectFocusedAnnotation(),
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(AnnotationUI(ProjectAnnotations));
