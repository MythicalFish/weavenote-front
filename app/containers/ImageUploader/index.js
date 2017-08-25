import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactS3Uploader from 'react-s3-uploader';
import PlusButton from 'components/PlusButton';
import InlineIcon from 'components/InlineIcon';
import Spinner from 'components/Spinner';
import { notifyWarning } from 'containers/Notification';
import * as API from 'utils/API';
import { uploadImage, createImage } from './actions';
import { selectIsUploading } from './selectors';

class ImageUploader extends React.PureComponent {
  state = { progress: 0 };
  onUploadPreprocess = (file, next) => {
    const { imageable } = this.props;
    this.props.uploadImage({ imageable });
    next(file);
  };
  onUploadProgress = (percent) => {
    this.setState({ progress: percent });
  };
  onFinish = (image) => {
    const { imageable, onUploadFinish } = this.props;
    const payload = { imageable, image };
    this.props.createImage(payload);
    if (onUploadFinish) onUploadFinish(payload);
  };
  onUploadError = (message) => {
    this.props.notifyWarning('Upload error');
    console.log(`Upload error: ${message}`);
  };
  render() {
    const Button = () =>
      <ReactS3Uploader
        server={process.env.API_URL}
        signingUrl={'/s3_url'}
        signingUrlMethod="GET"
        signingUrlHeaders={{ Authorization: API.accessToken() }}
        accept="image/*"
        preprocess={this.onUploadPreprocess}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onFinish}
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/gi, '')}
      />;
    const { label, inlineIcon, isUploading, text } = this.props;
    if (isUploading === this.props.imageable) {
      return <Spinner />;
    }
    if (label) {
      return (
        <label className="btn">
          {inlineIcon && <InlineIcon name={inlineIcon} />}
          {label}
          <Button />
        </label>
      );
    }
    return (
      <div className="flex items-center">
        <PlusButton color="gray" size={25}>
          <Button />
        </PlusButton>
        {text &&
          <div className="ml1 dark6">
            {text}
          </div>}
      </div>
    );
  }
}

ImageUploader.propTypes = {
  imageable: PropTypes.object,
  uploadImage: PropTypes.func,
  createImage: PropTypes.func,
  label: PropTypes.string,
  inlineIcon: PropTypes.string,
  text: PropTypes.string,
  onUploadFinish: PropTypes.func,
  notifyWarning: PropTypes.func,
  isUploading: PropTypes.object,
};

const mapState = createStructuredSelector({
  isUploading: selectIsUploading(),
});

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      uploadImage,
      createImage,
      notifyWarning,
    },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(ImageUploader);
