import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Image from 'components/Image';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import ImageForm from 'containers/ImageForm';
import { PLACEHOLDER } from './constants';

// console.log(e.nativeEvent.offsetX);
// console.log(e.nativeEvent.offsetY);

class ProjectImages extends React.PureComponent {
  state = { currentImage: null };
  componentDidMount = () => {
    this.selectImage(this.props.project.getIn(['images', '0']));
  };
  selectImage = (image) => {
    this.setState({ currentImage: image });
  };
  render() {
    const { project } = this.props;
    const { currentImage } = this.state;
    console.log(currentImage);
    return (
      <div>
        {!currentImage && <Image src={PLACEHOLDER} />}
        {currentImage &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <Image src={currentImage.getIn(['urls', 'medium'])} />
          </div>}
        <div className="pt1">
          <div className="flex">
            <ImageThumbnails
              images={project.get('images')}
              onSelect={this.selectImage}
            />
            <ImageUploader
              imageable={{ type: 'Project', id: project.get('id') }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProjectImages.propTypes = {
  project: PropTypes.object,
  images: PropTypes.object,
  commentAnnotation: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ProjectImages);
