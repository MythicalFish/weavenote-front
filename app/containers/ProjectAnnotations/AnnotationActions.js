import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import confirm from 'utils/confirm';

const AnnotationActions = (props) => {
  if (!props.visible) return null;
  const {
    position,
    deleteAnnotation,
    imageID: image_id,
    hideMenu,
    focusedAnnotation,
  } = props;
  const id = focusedAnnotation.get('id');
  const style = {
    left: position.x,
    top: position.y,
  };
  const handleDelete = () => {
    confirm('Are you sure you want to archive this annotation?').then(() => {
      deleteAnnotation({ id, image_id });
      hideMenu();
    });
  };
  return (
    <div className="annotation-actions on-hover" style={style}>
      <Icon name="Trash" size={15} onClick={handleDelete} />
    </div>
  );
};

AnnotationActions.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.object,
  focusedAnnotation: PropTypes.object,
  deleteAnnotation: PropTypes.func,
  hideMenu: PropTypes.func,
  imageID: PropTypes.number,
};

export default AnnotationActions;
