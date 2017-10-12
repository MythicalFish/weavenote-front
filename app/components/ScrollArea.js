import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ScrollArea = (props) => {
  const sProps = {
    autoHide: true,
    onUpdate: props.onUpdate || null,
  };
  const dProps = { ...props };
  delete dProps.autoHide;
  delete dProps.onUpdate;
  return (
    <Scrollbars {...sProps}>
      <div {...dProps} />
    </Scrollbars>
  );
};

ScrollArea.propTypes = {
  onUpdate: PropTypes.func,
};

export default ScrollArea;
