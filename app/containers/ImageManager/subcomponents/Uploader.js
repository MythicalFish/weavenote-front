import React, { PropTypes } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import PlusButton from 'components/PlusButton';
import * as API from 'utils/API';

class Uploader extends React.Component {
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
    const { imageable } = this.props.currentImage;
    this.props.createImage({ imageable, image });
  };
  onUploadError(message) {
    console.log(`Upload error: ${message}`);
  }
  render() {
    return (
      <div>
        {this.state.progress === 0 &&
          <PlusButton>
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
              scrubFilename={(filename) =>
                filename.replace(/[^\w\d_\-\.]+/gi, '')}
            />
          </PlusButton>}
        {this.state.progress > 0 &&
          <div>
            Uploading: {this.state.progress}%
          </div>}
      </div>
    );
  }
}

Uploader.propTypes = {
  imageable: PropTypes.object,
  createImage: PropTypes.func,
};

export default Uploader;
