import React, { PropTypes } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import { accessToken, request } from 'utils/request';

class ImageUploader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onUploadStart(file, next) {
    // console.log('upload starting');
    next(file);
  }
  onUploadProgress() {
    // console.log('upload progressing');
  }
  onUploadError() {
    // console.log('upload error');
  }
  onUploadFinish() {
    // console.log('upload finished');
  }
  getSignedURL(id, file, callback) {
    // console.log('get signed url');
    request({ path: `projects/${id}/get_upload_url` })
      .then((response) => {
        console.log(file);
        console.log(response);
        callback(file, response);
      });
  }
  // componentDidMount() {
  //   this.getSignedURL(1,this.testCallback);
  // }
  // testCallback(file,r) {
  //   console.log(file);
  //   console.log(r);
  // }
  render() {
    return (
      <ReactS3Uploader
        getSignedUrl={(file, callback) => { this.getSignedURL(this.props.project.id, file, callback); }}
        signingUrlMethod="GET"
        accept="image/*"
        preprocess={this.onUploadStart}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onUploadFinish}
        signingUrlHeaders={{ Authorization: accessToken() }}
      // signingUrlQueryParams={{ additional: query - params }}
      // signingUrlWithCredentials={true}      // in case when need to pass authentication credentials via CORS
      // uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
      // contentDisposition="auto"
      // scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
        server={process.env.API_URL}
      />
    );
  }
}

ImageUploader.propTypes = {
  project: PropTypes.object,
};


export default ImageUploader;
