import React from 'react';
import { IMAGE_PLACEHOLDER } from 'containers/App/constants/misc';

class Thumbnail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  thumbnailURL(props) {
    const url = props.project.thumbnail_url;
    if (url) { return url; }
    return IMAGE_PLACEHOLDER;
  }

  render() {
    return (
      <img src={this.thumbnailURL(this.props)} role="presentation" />
    );
  }
}

Thumbnail.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default Thumbnail;
