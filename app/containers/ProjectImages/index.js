import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Image from 'components/Image';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageForm from 'containers/ImageForm';
import { PLACEHOLDER } from './constants';

// console.log(e.nativeEvent.offsetX);
// console.log(e.nativeEvent.offsetY);

class ProjectImages extends React.PureComponent {
  state = { currentImage: null };
  componentDidMount = () => {
    this.selectImage(this.props.images.get('0'));
  };
  selectImage = (image) => {
    this.setState({ currentImage: image });
  };
  render() {
    const { currentImage } = this.state;
    return (
      <div>
        {!currentImage && <Image src={PLACEHOLDER} />}
        {currentImage &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <Image src={currentImage.getIn(['urls', 'medium'])} />
          </div>}
        <div className="pt1">
          <ImageThumbnails {...this.props} onSelect={this.selectImage} />
        </div>
      </div>
    );
  }
}

ProjectImages.propTypes = {
  images: PropTypes.object,
  commentAnnotation: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(ProjectImages);
