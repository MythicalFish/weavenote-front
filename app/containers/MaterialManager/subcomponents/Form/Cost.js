import React, { PropTypes } from 'react';

export default class Cost extends React.PureComponent {
  render() {
    const { currencies, F } = this.props;

    return (
      <div className="row">
        <div className="col-xs-6">
          <F name="cost_base" label="Base cost" />
        </div>
        <div className="col-xs-6">
          <F name="currency" type="select" label="Currency" data={currencies} />
        </div>
        <div className="col-xs-4">
          <F name="cost_delivery" label="Delivery cost" />
        </div>
        <div className="col-xs-4">
          <F name="cost_extra1" label="Extra cost 1" />
        </div>
        <div className="col-xs-4">
          <F name="cost_extra2" label="Extra cost 2" />
        </div>
      </div>
    );
  }
}

Cost.propTypes = {
  currencies: PropTypes.object,
  F: PropTypes.func,
};
