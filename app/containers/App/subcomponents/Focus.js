import React, { PropTypes } from 'react';

export default function Focus(props) {
  const { focus, modalID } = props;
  const showBlur = focus || modalID;
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
  focus: PropTypes.string,
  children: PropTypes.node,
};
