import React, { PropTypes } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import * as API from 'utils/API';

export default class Uploader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({ progress: 0 });
  }
  onUploadPreprocess(file, next) {
    console.log(`Pre-process: ${file.name}`); // eslint-disable-line no-console
    next(file);
  }
  onUploadProgress = (percent, message) => {
    let p = percent;
    if (percent === 0) { p = 1; }
    if (percent === 100) { p = 0; }
    console.log(`Upload progress: ${p}% ${message}`); // eslint-disable-line no-console
    this.setState({ progress: p });
  }
  onFinish = (data) => {
    console.log('Upload finished:'); // eslint-disable-line no-console
    this.props.onFinish(data);
  }
  onUploadError(message) {
    console.log(`Upload error: ${message}`); // eslint-disable-line no-console
  }
  render() {
    return (
      <div>
        {this.state.progress === 0 &&
          <div className="glyph">
            <i className="fa fa-plus-circle"></i>
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
              scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
            />
          </div>
        }
        {this.state.progress > 0 &&
          <div>
            Uploading: {this.state.progress}%
          </div>
        }
      </div>
    );
  }
}

Uploader.propTypes = {
  projectID: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
  onFinish: PropTypes.func,
};

