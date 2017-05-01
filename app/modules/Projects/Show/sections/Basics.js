import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeImage } from 'containers/Projects/actions';
import { selectCurrentImage } from 'containers/Projects/selectors';
import ImageUploader from 'components/ImageUploader';
import DataRow from 'components/DataRow';
import Thumbnails from 'modules/Projects/shared/Thumbnails';

class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.selectImage();
  }
  selectImage() {
    const { dispatch, currentProject, currentImage } = this.props;
    const firstImage = currentProject.getIn(['images', 0]);
    if (!currentImage && firstImage) {
      dispatch(changeImage(firstImage.toJS()));
    }
  }
  currentImage() {
    const { currentImage } = this.props;
    if (!currentImage) {
      return {
        id: 0,
        name: null,
        url: 'https://i.imgur.com/19jCEX4.jpg',
      };
    }
    return currentImage.toJS();
  }
  render() {
    const { dispatch, currentProject } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7">
          <ImageUploader project={currentProject} />
          <img src={this.currentImage().url} role="presentation" className="x-max20" />
          <Thumbnails images={currentProject.get('images').toArray()} handleClick={(data) => { dispatch(changeImage(data)); }} />
        </div>
        <div className="col-xs-12 col-md-5 flex justify-center">
          <form className="itemization" onSubmit={() => {  }}>
            <header>
              {currentProject.name}
            </header>
            <DataRow name="category" val={currentProject.category} />
            <DataRow name="identifier" val={currentProject.identifier} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
  currentProject: PropTypes.object.isRequired,
  currentImage: PropTypes.object,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return { dispatch };
}

const mapState = createStructuredSelector({
  currentImage: selectCurrentImage(),
});

export default connect(mapState, mapDispatch)(Basics);
