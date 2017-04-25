import React from 'react';

class ShowProject extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnSubmit = (data) => {
    this.props.onSubmit(data);
  }
  render() {
    const { id, basics } = this.props;
    return (
      <div>
        {basics.name}
      </div>
    );
  }
}

ShowProject.propTypes = {
  id: React.PropTypes.number,
  basics: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
};

export default ShowProject;
