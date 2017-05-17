import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

class Instructions extends React.Component {

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
        Instructions
      </div>
    );
  }
}

Instructions.propTypes = {
};


export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
  
});

export default connect(mapState, mapDispatch)(Instructions);
