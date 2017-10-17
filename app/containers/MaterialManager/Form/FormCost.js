import React, { PropTypes } from 'react';

export default class Cost extends React.PureComponent {
  render() {
    const { globalData, Field } = this.props;

    return (
      <div className="row">
        <Field
          name="currency"
          type="select"
          label="Currency"
          data={globalData.currencies}
          c="col-xs-8 mb2"
        />
        <Field
          name="cost_base"
          label="Base cost"
          placeholder="Eg. 3.50"
          c="col-xs-4 mb2"
        />
        <Field
          name="unit_type"
          type="select"
          data={globalData.unitTypes}
          label="Unit type"
          c="col-xs-12"
        />
      </div>
    );
  }
}

Cost.propTypes = {
  globalData: PropTypes.object,
  Field: PropTypes.func,
};
