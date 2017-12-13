import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import confirm from 'utils/confirm';

const AnnotationActions = (props) => {
  if (!props.visible) return null;
  const { position, hideMenu, focusedAnnotation: annotation } = props;
  const style = {
    left: position.x,
    top: position.y,
  };
  const handleDelete = () => {
    confirm('Are you sure you want to archive this annotation?').then(() => {
      props.deleteAnnotation(annotation);
      hideMenu();
    });
  };
  const editLabel = () => {
    props.editLabel(annotation);
  };
  return (
    <div className="annotation-actions on-hover" style={style}>
      <Icon fontIcon="fa fa-trash" onClick={handleDelete} tooltip="Delete" />
      {annotation.get('type') === 'line' && (
        <Icon fontIcon="fa fa-tag" onClick={editLabel} tooltip="Edit label" />
      )}
    </div>
  );
};

AnnotationActions.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.object,
  focusedAnnotation: PropTypes.object,
  hideMenu: PropTypes.func,
  editLabel: PropTypes.func,
};

export default AnnotationActions;
