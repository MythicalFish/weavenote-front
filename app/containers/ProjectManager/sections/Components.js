import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchComponents } from '../actions';
import { selectComponents } from '../selectors';

class Components extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { doFetchComponents, project } = this.props;
    doFetchComponents(project.id);
  }

  render() {
    return (
      <div className="row">
        mats
      </div>
    );
  }
}

Components.propTypes = {
  components: PropTypes.object,
  project: PropTypes.object,
  doFetchComponents: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    doFetchComponents: (id) => { dispatch(fetchComponents(id)); },
  };
}

const mapState = createStructuredSelector({
  components: selectComponents(),
});

export default connect(mapState, mapDispatch)(Components);
