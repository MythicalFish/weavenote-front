import React, { PropTypes } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import { accessToken } from 'utils/request';

class ImageUploader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { project } = this.props;
    return (
      <ReactS3Uploader
        server={process.env.API_URL}
        signingUrl={`/projects/${project.id}/get_upload_url`}
        signingUrlMethod="GET"
        signingUrlHeaders={{ Authorization: accessToken() }}
        accept="image/*"
        preprocess={this.onUploadStart}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onUploadFinish}
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
      />
    );
  }
}

ImageUploader.propTypes = {
  project: PropTypes.object,
};


export default ImageUploader;
