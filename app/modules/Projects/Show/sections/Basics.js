import React from 'react';
import { mainImage } from 'modules/Projects/Shared/Images';
import ImageUploader from 'components/ImageUploader';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7">
          <ImageUploader project={p} />
          <img src={mainImage(p).url} role="presentation" />
        </div>
        <div className="col-xs-12 col-md-5">
          <form>
            <div className="flex justify-between">
              <label>Name</label>
              <input className="x-max20" type="text" placeholder="Name" defaultValue={p.name} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
};
