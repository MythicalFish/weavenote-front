import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

class Collaborators extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      creating: false,
    };
  }

  componentDidMount() {
    const { project } = this.props;
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  }

  render() {
    return (
      <div>
        Collaborators
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