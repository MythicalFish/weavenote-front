import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicsForm from './BasicsForm';
import ImageInterface from '../ImageInterface';

class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { dispatch, currentProject } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7 flex justify-center">
          <div>
            <ImageInterface project={currentProject} />
          </div>
        </div>
        <div className="col-xs-12 col-md-5 flex justify-center">
          <BasicsForm handleSubmit={this.updateBasics} project={currentProject} />
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
  currentProject: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return { dispatch };
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Basics);
