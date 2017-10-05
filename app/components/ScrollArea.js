import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ScrollArea = ({ children, vertical, horizontal }) => (
  <Scrollbars vertical={vertical !== false} horizontal={!!horizontal}>
    {children}
  </Scrollbars>
);

ScrollArea.propTypes = {
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  children: PropTypes.node,
};

export default ScrollArea;
