import React, { PropTypes } from 'react';
import Form from './Form';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { currentProject } = this.props;
    return (
      currentProject && <Form />
    );
  }
}

Basics.propTypes = {
  currentProject: PropTypes.object,
};
