import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ThumbnailList from 'components/ThumbnailList';
import { selectImages, selectCurrentImage } from '../../selectors';
import { fetchImages, switchImage, deleteImage } from '../../actions';
import Uploader from './Uploader';
import { IMAGE_PLACEHOLDER } from 'containers/App/constants/misc';

class Images extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { dispatch, project } = this.props;
    dispatch(fetchImages(project.id));
  }
  currentImage() {
    const { currentImage } = this.props;
    if (currentImage) {
      return currentImage;
    }
    return { url: IMAGE_PLACEHOLDER };
  }
  render() {
    const { dispatch, project, images } = this.props;
    const image = this.currentImage();
    return (
      <div>
        <div className="flex flex-column items-center">
          {image.id &&
            <div>
              <button onClick={() => { dispatch(deleteImage({ projectID: project.id, id: image.id })); }}>Delete</button>
            </div>
          }
          <img src={image.url} role="presentation" className="x-max20" />
        </div>
        <div>
          <ThumbnailList
            images={images}
            handleClick={(data) => { dispatch(switchImage(data)); }}
          />
        </div>
        <Uploader project={project} />
      </div>
    );
  }
}

Images.propTypes = {
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

export default connect(mapState, mapDispatch)(Images);