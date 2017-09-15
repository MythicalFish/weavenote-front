import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'components/Button';
import confirm from 'utils/confirm';
import { deleteImage } from './actions';

const DeleteButton = (props) => {
  const { image } = props;
  const imageable = image.get('imageable_info').toJS();
  return (
    <Button
      {...props.attributes}
      onClick={() => {
        confirm('Are you sure you want to delete this image?').then(() => {
          props.deleteImage({ imageable, image });
        });
      }}
    />
  );
};

DeleteButton.propTypes = {
  image: PropTypes.object,
  attributes: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ deleteImage }, dispatch);
}

export default connect(null, mapDispatch)(DeleteButton);
