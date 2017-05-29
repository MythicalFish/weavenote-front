import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IMAGE_PLACEHOLDER } from 'containers/App/constants/misc';
import ThumbnailList from 'components/ThumbnailList';
import Uploader from 'components/Uploader';
import { selectImages, selectCurrentImage } from '../../selectors';
import { fetchImages, switchImage, deleteImage, createImage } from '../../actions';

class Images extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { fetchImages: f, project: p } = this.props;
    f(p.id);
  }
  currentImage() {
    const { currentImage: c } = this.props;
    if (c) return c;
    return { url: IMAGE_PLACEHOLDER };
  }
  createImage = (data) => {
    const { project } = this.props;
    this.props.createImage({ projectID: project.id, data });
  }
  deleteImage = (imageID) => {
    const { project } = this.props;
    this.props.deleteImage({ projectID: project.id, imageID });
  }
  render() {
    const { project, images } = this.props;
    const image = this.currentImage();
    return (
      <div>
        <div className="flex flex-column items-center">
          {image.id &&
            <button onClick={() => { this.deleteImage(image.id); }}>Delete</button>
          }
          <img src={image.url} role="presentation" className="x-max20" />
        </div>
        <div>
          <ThumbnailList
            images={images}
            handleClick={(index) => { this.props.switchImage(index); }}
          />
        </div>
        <Uploader projectID={project.id} onFinish={(data) => { this.createImage(data); }} />
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.object,
  project: PropTypes.object,
  currentImage: PropTypes.object,
  deleteImage: PropTypes.func,
  switchImage: PropTypes.func,
  createImage: PropTypes.func,
  fetchImages: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchImages, switchImage, deleteImage, createImage },
    dispatch,
  );
}

const mapState = createStructuredSelector({
  images: selectImages(),
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(Images);
