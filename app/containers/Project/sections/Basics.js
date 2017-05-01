import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mainImage } from 'modules/Projects/Images';
import { changeImage } from 'containers/Images/actions';
import Thumbnails from 'modules/Projects/Thumbnails';
import ImageUploader from 'components/ImageUploader';
import DataRow from 'components/DataRow';
import Images from 'containers/Images';

class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7">
          <Images />
          <ImageUploader project={p} />
          <img src={mainImage(p).url} role="presentation" />
        </div>
        <div className="col-xs-12 col-md-5 flex justify-center">
          <form className="itemization" onSubmit={() => { p.onSubmit(); }}>
            <header>
              {p.name}
            </header>
            <DataRow name="category" val={p.category} />
            <DataRow name="identifier" val={p.identifier} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
};

export function mapDispatch(dispatch) {
  return {
    selectImage: (id) => {
      dispatch(selectImage(id));
    },
  };
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Basics);