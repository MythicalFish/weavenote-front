import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Thumbnails from 'components/Thumbnails';
import ImageUploader from 'components/ImageUploader';
import { selectCurrentImage } from 'containers/ProjectManager/selectors';
import { changeImage } from '../actions';

class ImageInterface extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.setImage();
  }
  setImage() {
    const { dispatch, project } = this.props;
    const image = project.getIn(['images', 0]);
    let imageData = null;
    if (image) {
      imageData = image.toJS();
    }
    dispatch(changeImage(imageData));
  }
  getImageURL() {
    const { currentImage } = this.props;
    if (currentImage) {
      return currentImage.get('url');
    }
    return 'https://i.imgur.com/19jCEX4.jpg';
  }
  render() {
    const { dispatch, project } = this.props;
    return (
      <div>
        <div>
          <img src={this.getImageURL()} role="presentation" className="x-max20" />
        </div>
        <div>
          <Thumbnails images={project.get('images').toArray()} handleClick={(data) => { dispatch(changeImage(data)); }} />
        </div>
        <ImageUploader project={project} />
      </div>
    );
  }
}

ImageInterface.propTypes = {
  project: PropTypes.object,
  currentImage: PropTypes.object,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return { dispatch };
}

const mapState = createStructuredSelector({
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(ImageInterface);
