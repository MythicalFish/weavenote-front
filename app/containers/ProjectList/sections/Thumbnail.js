import React from 'react';
import { mainImage } from 'utils/images';

class Thumbnail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const image = mainImage(this.props.project);
    return (
      <img src={image.url} role="presentation" />
    );
  }
}

Thumbnail.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default Thumbnail;
