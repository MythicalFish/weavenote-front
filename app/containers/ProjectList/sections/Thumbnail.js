import React from 'react';

class Thumbnail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  thumbnailURL(props) {
    const url = props.project.thumbnail_url;
    if (url) { return url; }
    return 'https://i.imgur.com/19jCEX4.jpg';
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
