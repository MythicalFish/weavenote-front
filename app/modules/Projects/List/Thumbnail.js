import React from 'react';

class Thumbnail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props.project;
    return (
      <img src={p.images[0].url} role="presentation" />
    );
  }
}

Thumbnail.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default Thumbnail;
