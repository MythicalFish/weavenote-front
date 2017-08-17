import React, { PropTypes } from 'react';

export default function Blur(props) {
  const { focus, modalID } = props;
  const showBlur = focus || modalID;
  return (
    <div className="flex flex-auto">
      <div className={`${showBlur ? 'overlay' : ''}`} />
      <div className={`flex-auto ${showBlur ? 'blur' : ''}`}>
        {props.children}
      </div>
    </div>
  );
}

Blur.propTypes = {
  modalID: PropTypes.string,
  focus: PropTypes.string,
  children: PropTypes.node,
};
