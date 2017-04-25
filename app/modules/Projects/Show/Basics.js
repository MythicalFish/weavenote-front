import React from 'react';

export default class Basics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props;
    return (
      <div>
        <form>
          <input type="text" placeholder="Name" value={p.name} />
        </form>
      </div>
    );
  }
}

Basics.propTypes = {
};
