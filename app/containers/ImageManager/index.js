import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Image from 'components/Image';
import { selectCommentAnnotation } from 'containers/Comments/selectors';
import ThumbnailList from './ThumbnailList';
import ImageForm from './ImageForm';

class ImageManager extends React.PureComponent {
  handleClick = (e) => {
    console.log(e.nativeEvent.offsetX);
    console.log(e.nativeEvent.offsetY);
    // save: coords, image id, comment id
  };
  render() {
    const {
      currentImage,
      placeholder,
      imageable,
      commentAnnotation,
    } = this.props;
    const modalID = `${imageable.type}Image`;
    const imgClass = commentAnnotation ? 'cursor-crosshair' : '';
    return (
      <div>
        {!currentImage && placeholder && <Image src={placeholder} />}
        {currentImage &&
          <div>
            <ImageForm initialValues={currentImage} {...this.props} />
            <Image
              src={currentImage.getIn(['urls', 'medium'])}
              onClick={this.handleClick}
              className={imgClass}
            />
          </div>}
        <div className="pt1">
          <ThumbnailList {...this.props} id={modalID} />
        </div>
      </div>
    );
  }
}

ImageManager.propTypes = {
  currentImage: PropTypes.object,
  commentAnnotation: PropTypes.object,
  imageable: PropTypes.object,
  placeholder: PropTypes.string,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  commentAnnotation: selectCommentAnnotation(),
});

export default connect(mapState, mapDispatch)(ImageManager);
