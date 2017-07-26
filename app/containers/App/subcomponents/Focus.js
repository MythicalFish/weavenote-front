import React, { PropTypes } from 'react';

export default function Focus(props) {
  const { focus, modalID, modalImage } = props;
  const showBlur = focus || modalID || modalImage;
  return (
    <div>
      <div className={showBlur && 'overlay'} />
      <div className={showBlur && 'blur'}>
        {props.children}
      </div>
    </div>
  );
}

Focus.propTypes = {
  modalID: PropTypes.string,
  modalImage: PropTypes.object,
  focus: PropTypes.string,
  children: PropTypes.node,
};
