import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactS3Uploader from 'react-s3-uploader';
import { accessToken } from 'utils/request';
import { createImage } from 'containers/Projects/actions';

class ImageUploader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onUploadPreprocess(file, next) {
    console.log('Pre-process: ' + file.name);
    next(file);
  }
  onUploadProgress(percent, message) {
    console.log('Upload progress: ' + percent + '% ' + message);
  }
  onFinish(data) {
    console.log("Upload finished: ");
    this.props.createImage(data);
  }
  onUploadError(message) {
    console.log("Upload error: " + message);
  }
  render() {
    const { project } = this.props;
    return (
      <ReactS3Uploader
        server={process.env.API_URL}
        signingUrl={`/projects/${project.get('id')}/get_upload_url`}
        signingUrlMethod="GET"
        signingUrlHeaders={{ Authorization: accessToken() }}
        accept="image/*"
        preprocess={this.onUploadPreprocess}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={(data) => { this.props.createImage(data); }}
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
      />
    );
  }
}

ImageUploader.propTypes = {
  project: PropTypes.object,
  createImage: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    createImage: (data) => {
      dispatch(createImage(data));
    },
  };
}

const mapState = createStructuredSelector({

});

export default connect(mapState, mapDispatch)(ImageUploader);
