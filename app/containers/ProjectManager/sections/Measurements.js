import React, { PropTypes } from 'react';

export default class Measurements extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { currentProject } = this.props;
    return (
      <div className="row">
        mats
      </div>
    );
  }
}

Measurements.propTypes = {
  currentProject: PropTypes.object,
};
