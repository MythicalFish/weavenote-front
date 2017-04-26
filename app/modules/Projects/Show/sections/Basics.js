import React from 'react';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-7">
          <img src="" role="presentation" />
        </div>
        <div className="col-xs-12 col-md-5">
          <form>
            <input type="text" placeholder="Name" defaultValue={p.name} />
          </form>
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
};
