import React, { PropTypes } from 'react';
import BasicsForm from './BasicsForm';
import ImageInterface from '../ImageInterface';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { currentProject } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7 flex justify-center">
          <div>
            <ImageInterface project={currentProject} />
          </div>
        </div>
        <div className="col-xs-12 col-md-5 flex justify-center">
          <BasicsForm initialValues={currentProject} />
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
  currentProject: PropTypes.object.isRequired,
};
