import React, { PropTypes } from 'react';

export default class Cost extends React.PureComponent {
  render() {
    const { currencies, unitTypes, F } = this.props;

    return (
      <div className="row">
        <div className="col-xs-6">
          <F
            name="currency"
            type="select"
            placeholder="Currency"
            data={currencies}
          />
        </div>
        <div className="col-xs-6">
          <F name="cost_base" placeholder="Eg. 3.50" />
        </div>
        <div className="col-xs-12">
          <F name="unit_type_id" type="select" data={unitTypes} />
        </div>
      </div>
    );
  }
}

Cost.propTypes = {
  unitTypes: PropTypes.object,
  currencies: PropTypes.object,
  F: PropTypes.func,
};
