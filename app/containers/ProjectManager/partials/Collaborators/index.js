import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Invite from './Invite';

class Collaborators extends React.Component {

  render() {
    const { project } = this.props;
    return (
      <div>
        <header>Collaborators</header>
        <div className="p3">

        </div>
        <footer className="bt1 p2">
          <Invite />
        </footer>
      </div>
    );
  }
}

Collaborators.propTypes = {
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
  
});

export default connect(mapState, mapDispatch)(Collaborators);
