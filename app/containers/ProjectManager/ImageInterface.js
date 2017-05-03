import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Thumbnails from 'components/Thumbnails';
import ImageUploader from 'components/ImageUploader';
import { changeImage } from 'containers/ProjectsPage/actions';
import { selectCurrentImage } from 'containers/ProjectsPage/selectors';

class ImageInterface extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.selectImage();
  }
  selectImage() {
    const { dispatch, project, currentImage } = this.props;
    const firstImage = project.getIn(['images', 0]);
    if (!currentImage && firstImage) {
      dispatch(changeImage(firstImage.toJS()));
    }
  }
  currentImage() {
    const { currentImage } = this.props;
    if (!currentImage) {
      return {
        id: 0,
        name: null,
        url: 'https://i.imgur.com/19jCEX4.jpg',
      };
    }
    return currentImage.toJS();
  }
  render() {
    const { dispatch, project } = this.props;
    return (
      <div>
        <div>
          <img src={this.currentImage().url} role="presentation" className="x-max20" />
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
