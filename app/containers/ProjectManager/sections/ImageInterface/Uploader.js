import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactS3Uploader from 'react-s3-uploader';
import { accessToken } from 'utils/request';
import { createImage } from '../../actions';

class Uploader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({ progress: 0 });
  }
  onUploadPreprocess(file, next) {
    console.log(`Pre-process: ${file.name}`); // eslint-disable-line no-console
    next(file);
  }
  onUploadProgress(percent, message) {
    let p = percent;
    if (percent === 0) { p = 1; }
    if (percent === 100) { p = 0; }
    console.log(`Upload progress: ${p}% ${message}`); // eslint-disable-line no-console
    this.setState({ progress: p });
  }
  onFinish(data) {
    console.log('Upload finished:'); // eslint-disable-line no-console
    const { dispatch } = this.props;
    dispatch(createImage(data));
  }
  onUploadError(message) {
    console.log(`Upload error: ${message}`); // eslint-disable-line no-console
  }
  render() {
    const { project } = this.props;
    return (
      <div>
        {this.state.progress === 0 &&
          <div className="glyph">
            <i className="fa fa-plus-circle"></i>
            <ReactS3Uploader
              server={process.env.API_URL}
              signingUrl={`/projects/${project.id}/images/get_upload_url`}
              signingUrlMethod="GET"
              signingUrlHeaders={{ Authorization: accessToken() }}
              accept="image/*"
              preprocess={this.onUploadPreprocess}
              onProgress={this.onUploadProgress.bind(this)}
              onError={this.onUploadError}
              onFinish={this.onFinish.bind(this)}
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
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return { dispatch };
}

const mapState = createStructuredSelector({

});

export default connect(mapState, mapDispatch)(Uploader);
