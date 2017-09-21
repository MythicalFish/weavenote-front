import React, { PropTypes } from 'react';
import Icon from 'components/Icon';

const ImageActions = (props) => {
  const { currentView, focusThis, doThis } = props;
  const doThing = (action, vars = null) => {
    focusThis();
    doThis(action, vars);
  };
  return (
    <div className="on-hover image-actions">
      {currentView !== 'Measurements' && (
        <Icon
          onClick={() =>
            doThing('annotate', {
              type: 'dot',
              annotatable: { type: 'Comment', id: null },
              maxAnchors: 1,
            })}
          name="Circle"
          size={20}
          tooltip="Annotate"
        />
      )}
      {currentView === 'Measurements' && (
        <Icon
          onClick={() => doThing('annotate', { type: 'line', maxAnchors: 2 })}
          name="MoreHorizontal"
          size={20}
          tooltip="Add line"
        />
      )}
      <Icon
        onClick={() => doThing('form')}
        name="Edit"
        size={20}
        tooltip="Edit"
      />
    </div>
  );
};

ImageActions.propTypes = {
  focusThis: PropTypes.func,
  doThis: PropTypes.func,
  currentView: PropTypes.string,
};

export default ImageActions;
