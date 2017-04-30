import React from 'react';
import { mainImage } from 'modules/Projects/Shared/Images';
import DataRow from 'components/DataRow';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7 flex justify-center">
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
