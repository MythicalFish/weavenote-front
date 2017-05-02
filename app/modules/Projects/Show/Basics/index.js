import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateBasics } from 'containers/Projects/actions';
import DataRow from 'components/DataRow';
import ImageInterface from '../ImageInterface';

class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { dispatch, currentProject } = this.props;
    const project = currentProject.toJS();
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7 flex justify-center">
          <div>
            <ImageInterface project={currentProject} />
          </div>
        </div>
        <div className="col-xs-12 col-md-5 flex justify-center">
          <form className="itemization" onSubmit={(e) => { e.preventDefault(); console.log(e); console.log(this); }}>
            <header>
              {project.name}
            </header>
            <DataRow name="category" val={project.category} />
            <DataRow name="identifier" val={project.identifier} />
            <button className="btn" type="submit">Save</button>
          </form>
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
