import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Canvas from 'components/Canvas';
import Annotation from './Annotation';
import { selectNewAnnotation, selectIsAnnotating } from './selectors';
import { writeComment } from '../Comments/actions';
import { relativePosition } from './utils';
import {
  setAnchor,
  setAnnotation,
  createAnnotation,
  cancelAnnotation,
} from './actions';

class ImageAnnotations extends React.PureComponent {
  handleClick = ({ evt: e }) => {
    const { setAnchor: set, canvasSize, newAnnotation } = this.props;
    const pos = { x: e.offsetX, y: e.offsetY };
    set(relativePosition(pos, canvasSize));
    if (newAnnotation.get('type') === 'dot') this.props.writeComment();
  };
  render() {
    const { canvasSize, image, newAnnotation } = this.props;
    const cProps = { size: canvasSize };
    if (this.props.isAnnotating) cProps.onClick = this.handleClick;
    return (
      <Canvas {...cProps}>
        {image
          .get('annotations')
          .map((annotation, index) => (
            <Annotation
              key={`Annotation${index}`}
              data={annotation}
              {...this.props}
            />
          ))}
        {this.props.isAnnotating && (
          <Annotation data={newAnnotation} {...this.props} />
        )}
      </Canvas>
    );
  }
}

ImageAnnotations.propTypes = {
  image: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  isAnnotating: PropTypes.bool,
  setAnchor: PropTypes.func,
  writeComment: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      setAnchor,
      setAnnotation,
      createAnnotation,
      cancelAnnotation,
      writeComment,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  newAnnotation: selectNewAnnotation(),
  isAnnotating: selectIsAnnotating(),
});

export default connect(mapState, mapDispatch)(ImageAnnotations);
