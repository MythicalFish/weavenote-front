import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactS3Uploader from 'react-s3-uploader';
import PlusButton from 'components/PlusButton';
import InlineIcon from 'components/InlineIcon';
import Spinner from 'components/Spinner';
import { notifyWarning } from 'containers/Notification';
import * as API from 'utils/API';
import { createImage } from './actions';

class ImageUploader extends React.PureComponent {
  state = { progress: 0, uploading: false };
  onUploadPreprocess = (file, next) => {
    this.toggleState();
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
    this.toggleState();
  };
  onUploadError = (message) => {
    this.props.notifyWarning('Upload error');
    this.toggleState();
    console.log(`Upload error: ${message}`);
  };
  toggleState = () => {
    this.setState({ uploading: !this.state.uploading });
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
    const { label, inlineIcon } = this.props;
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
      <div className="ml1">
        <PlusButton color="gray" size={25}>
          <Button />
        </PlusButton>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  imageable: PropTypes.object,
  createImage: PropTypes.func,
  label: PropTypes.string,
  inlineIcon: PropTypes.string,
  onUploadFinish: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      createImage,
      notifyWarning,
    },
    dispatch
  );
}

export default connect(null, mapDispatch)(ImageUploader);
