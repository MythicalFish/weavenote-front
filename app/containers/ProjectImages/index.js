import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Image from 'components/Image';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';
import ImageForm from 'containers/ImageForm';
import CurrentImage from './CurrentImage';
import { PLACEHOLDER } from './constants';
import * as selectors from './selectors';
import { setAnnotation } from './actions';

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
    return (
      <div>
        {!currentImage && <Image src={PLACEHOLDER} />}
        {currentImage &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <CurrentImage {...{ currentImage, ...this.props }} />
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
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ setAnnotation }, dispatch);
}

const mapState = createStructuredSelector({
  annotation: selectors.selectAnnotation(),
});

export default connect(mapState, mapDispatch)(ProjectImages);
