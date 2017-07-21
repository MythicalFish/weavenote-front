import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactS3Uploader from 'react-s3-uploader';
import PlusButton from 'components/PlusButton';
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
    const { imageable } = this.props;
    this.props.createImage({ imageable, image });
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
    return (
      <div>
        {!this.props.label &&
          <PlusButton>
            <Button />
          </PlusButton>}
        {this.props.label && <Button />}
        {this.state.progress > 0 &&
          <div>
            Uploading: {this.state.progress}%
          </div>}
      </div>
    );
  }
}

ImageUploader.propTypes = {
  imageable: PropTypes.object,
  createImage: PropTypes.func,
  label: PropTypes.string,
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
