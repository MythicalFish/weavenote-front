import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactS3Uploader from 'react-s3-uploader';
import PlusButton from 'components/PlusButton';
import InlineIcon from 'components/InlineIcon';
import * as API from 'utils/API';
import { createImage } from './actions';

class ImageUploader extends React.Component {
  state = { progress: 0 };
  onUploadPreprocess(file, next) {
    console.log(`Pre-process: ${file.name}`);
    next(file);
  }
  onUploadProgress = (percent, message) => {
    let p = percent;
    if (percent === 0) {
      p = 1;
    }
    if (percent === 100) {
      p = 0;
    }
    console.log(`Upload progress: ${p}% ${message}`);
    this.setState({ progress: p });
  };
  onFinish = (image) => {
    console.log('Upload finished:');
    const { imageable, onUploadFinish } = this.props;
    const payload = { imageable, image };
    this.props.createImage(payload);
    if (onUploadFinish) onUploadFinish(payload);
  };
  onUploadError(message) {
    console.log(`Upload error: ${message}`);
  }
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
      <div>
        <PlusButton>
          <Button />
        </PlusButton>
        {this.state.progress > 0 &&
          <div>
            {this.state.progress}%
          </div>}
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
    },
    dispatch
  );
}

export default connect(null, mapDispatch)(ImageUploader);
