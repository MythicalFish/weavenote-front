import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Thumbnails from 'components/Thumbnails';
import { selectImages, selectCurrentImage } from '../../selectors';
import { fetchImages, switchImage, deleteImage } from '../../actions';
import Uploader from './Uploader';

class ImageInterface extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { dispatch, project } = this.props;
    dispatch(fetchImages(project.id));
  }
  currentImageURL() {
    const { currentImage } = this.props;
    if (currentImage) {
      return currentImage.url;
    }
    return 'https://i.imgur.com/19jCEX4.jpg';
  }
  render() {
    const { dispatch, project } = this.props;
    return (
      <div>
        <div>
          <img src={this.currentImageURL()} role="presentation" className="x-max20" />
        </div>
        <div>
          <Thumbnails
            images={project.images}
            handleClick={(data) => { dispatch(switchImage(data)); }}
          />
        </div>
        <Uploader project={project} />
      </div>
    );
  }
}

ImageInterface.propTypes = {
  images: PropTypes.object,
  project: PropTypes.object,
  currentImage: PropTypes.object,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return { dispatch };
}

const mapState = createStructuredSelector({
  images: selectImages(),
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(ImageInterface);
